import {createClient} from '@supabase/supabase-js';
const SUPABASE_URL = "https://ujrwjqxwxfulftlbmgro.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVqcndqcXh3eGZ1bGZ0bGJtZ3JvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU3ODI4NDQsImV4cCI6MjA2MTM1ODg0NH0.TF5C9Luw-9ty_TAvkAq9EYD1Oq11fqApe_jphtUpdq4";

// using previous project's bucket
const BUCKET_NAME = "estate-bucket";
const supabase = createClient(SUPABASE_URL,SUPABASE_KEY);

const uploadToSupabase = async (file) => {
  if (!file) {
    throw new Error('No file selected');
  }

  const fileExtension = file.name.split('.').pop()?.toLowerCase();
  const filePath = `${Date.now()}.${fileExtension}`; 
  try {
    const { data, error } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(filePath, file, {
        cacheControl: '3600',    
        upsert: false,         
      });

    if (error) {
      console.error('Error uploading file:', error.message);
      return null;
    }

    const fileUrl = `${supabaseUrl}/storage/v1/object/public/${BUCKET_NAME}/${filePath}`;
    console.log('File uploaded successfully. File URL:', fileUrl);

    return fileUrl;
  } catch (error) {
    console.error('Error during file upload:', error);
    return null;
  }
};

export default uploadToSupabase;