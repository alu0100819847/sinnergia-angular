export interface ArticleAdminModel {
  id: string;
  name: string;
  price: number;
  stock: number;
  description: string;
  file: string;
  image: any;
  category: {
    id: string;
    name: string;
  };
}
