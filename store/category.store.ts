import { format } from "date-fns";
import { create } from "zustand";
import { Category } from "@/models/category.model";
import { getCategories } from "@/services/http-service";

type CategoryStore = {
  isLoadingCategories: boolean;
  categoryList: Category[];
  error: any;
  fetchCategories: () => void,
  selectedCategory: Category | null;
  setSelectedCategory: (category: Category) => void;
}

const useCategoryStore = create<CategoryStore>()((set) => ({
  isLoadingCategories: true,
  categoryList: [],
  error: null,
  selectedCategory: null,
  fetchCategories: async () =>  {
    const { data, error } = await getCategories();
    if (error) {
      set({ error, isLoadingCategories: false });
      return;
    }

    set({
      categoryList: data.map((item: any) => {
        return {
          id: item.id,
          name: item.name,
          description: item.description,
          number_of_mezmurs: item.mezmurs[0] ? item.mezmurs[0]['count'] : 0,
          last_updated_at: format(new Date(item.most_recent_mezmur[0]['updated_at']), "LLL d, y"),
        };
      }),
      isLoadingCategories: false });
  },
  setSelectedCategory(category) {
    set({ selectedCategory: category });
  },
}));

export default useCategoryStore;