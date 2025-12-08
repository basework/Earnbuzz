import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""

const supabase = createClient(supabaseUrl, supabaseAnonKey)

/**
 * Upload image to Supabase Storage
 * @param file - Image file to upload
 * @param bucket - Bucket name ('profile-pics' or 'payment-screenshots')
 * @param userId - User ID for organizing uploads
 * @returns Public URL of uploaded image or null on error
 */
export async function uploadImageToSupabase(
  file: File,
  bucket: "profile-pics" | "payment-screenshots",
  userId: string
): Promise<string | null> {
  try {
    // Validate file
    if (!file) {
      console.error("No file provided")
      return null
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      console.error("File too large (max 5MB)")
      return null
    }

    // Validate file type
    if (!file.type.startsWith("image/")) {
      console.error("Invalid file type")
      return null
    }

    // Create unique filename
    const timestamp = Date.now()
    const randomId = Math.random().toString(36).substr(2, 9)
    const filename = `${userId}/${timestamp}-${randomId}-${file.name}`

    // Upload to Supabase Storage
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(filename, file, {
        cacheControl: "3600",
        upsert: false,
      })

    if (error) {
      console.error("Supabase upload error:", error)
      return null
    }

    // Get public URL
    const { data: publicData } = supabase.storage
      .from(bucket)
      .getPublicUrl(data.path)

    return publicData.publicUrl
  } catch (error) {
    console.error("Image upload failed:", error)
    return null
  }
}

/**
 * Delete image from Supabase Storage
 * @param bucket - Bucket name
 * @param filePath - File path to delete
 */
export async function deleteImageFromSupabase(
  bucket: "profile-pics" | "payment-screenshots",
  filePath: string
): Promise<boolean> {
  try {
    const { error } = await supabase.storage.from(bucket).remove([filePath])

    if (error) {
      console.error("Supabase delete error:", error)
      return false
    }

    return true
  } catch (error) {
    console.error("Image deletion failed:", error)
    return false
  }
}
