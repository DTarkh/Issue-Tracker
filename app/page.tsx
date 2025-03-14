import { parse } from "path";
import { Pagination } from "./components";

export default function Home({searchParams}: {searchParams: {page:string} }) {

  
  return <Pagination itemsNumber={200} currentPage={parseInt(searchParams.page)} itemsPerPage={6} />;
}
