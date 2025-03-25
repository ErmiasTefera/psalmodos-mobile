import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://mhkdkdydnxneetwblrbt.supabase.co";
const SUPABASE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1oa2RrZHlkbnhuZWV0d2JscmJ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDExODgxMTksImV4cCI6MjA1Njc2NDExOX0.ObCUE3DvxlUoujGeOyLOOwbbvBqoQFM35uK21Nc6djk";

export const httpService = {};
// Initialize the Supabase client
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

export const getCategories = () => {
  return supabase.from("mezmur_category").select(`
        *,
        mezmurs: mezmur(count),
        most_recent_mezmur: mezmur!category_id(
      updated_at
    )!inner(
      updated_at
    ).order(updated_at, { ascending: false }).limit(1)
    `);
};

export const getAllMezmurs = async () => {
  return supabase.from("mezmur").select("*");
};

export const getMezmursByCategory = async (categoryId: string = "") => {
  if (!categoryId) {
    return supabase.from("mezmur").select("*");
  }
  return supabase.from("mezmur").select("*").eq("category_id", categoryId);
};


export const getFullFilePath = (filePath: string) => {
	return `${SUPABASE_URL}/storage/v1/object/public/${filePath}`;
}