import { SortOrder } from "mongoose";

type IOptio={
    page?:number;
    limit?:number;
    sortBy?:string;
    sortOrder?:SortOrder
}

type IPaginationReturn={
    page:number;
    limit:number;
    skip:number;
    sortBy:string;
    sortOrder:SortOrder
}
const calculatePagination=(option:IOptio):IPaginationReturn=>{
    const page=Number(option.page || 1)
    const limit=Number(option.limit || 10)
    const skip=(page-1)*limit 
    const sortBy=option.sortBy || 'createdAt'
    const sortOrder=option.sortOrder || 'desc'

    return {
        page,
        limit,
        skip,
        sortBy,
        sortOrder
    }
}

export default calculatePagination