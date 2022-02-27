import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setPagination } from "../../app/features/product/actions";
import { Btn } from "../atoms/button";

export default function Pagination({totalPage}) {
  const dispatch = useDispatch();
  let { pagination } = useSelector((state) => state.product);
  return (
    <div className="flex gap-3 items-center">
      {pagination.currentPage > 1 && (
        <Btn
          onClick={() =>
            dispatch(setPagination("currentPage", (pagination.currentPage - 1)))
          }
          color="bg-blue-500"
          label="Kembali"
        />
      )}
      <p>
        {pagination.currentPage}/{totalPage}
      </p>
      {pagination.currentPage !== totalPage && (
        <Btn
          onClick={() =>
            dispatch(setPagination("currentPage", (pagination.currentPage + 1)))
          }
          color="bg-blue-500"
          label="Selanjutnya"
        />
      )}
    </div>
  );
}
