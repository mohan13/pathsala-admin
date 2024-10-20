"use client";

import Breadcrumb from "../../../components/Breadcrumbs/Breadcrumb";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { AddProduct, addCategory, addProduct } from "../../store/dataSlice";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks/hooks";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { redirect } from "next/navigation";
import { Status } from "../../types/status";
import toast from "react-hot-toast";
import { resetStatus } from "@/app/store/authSlice";

interface Category {
  id: string;
  categoryName: string;
}
const AddCategory = () => {
  const dispatch = useAppDispatch();
  const { status } = useAppSelector((state: any) => state.datas);

  const [data, setData] = useState<{
    categoryName: string;
  }>({
    categoryName: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setData({
      ...data,
      [name]: value,
    });
  };
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await dispatch(addCategory(data));
    if (status === Status.SUCCESS) {
      toast.success("Category added successfully!!");
      dispatch(resetStatus());
      redirect("/tables");
    } else {
      redirect("/forms/add-category");
    }
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Add Category" />

      <div className="flex h-screen items-center justify-center overflow-hidden  ">
        <div
          className=" w-17/12 md:6/12 shadow-3xl bg-white lg:w-9/12 "
          style={{ marginTop: "-200px" }}
        >
          <form className="p-3 md:p-5" onSubmit={handleSubmit}>
            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
              Add Category
            </label>
            <div className="mb-6 flex items-center text-lg md:mb-8">
              <input
                onChange={handleChange}
                type="text"
                name="categoryName"
                id="categoryName"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                placeholder="categoryName"
              />
            </div>

            <button className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
              Add Category
            </button>
          </form>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default AddCategory;
