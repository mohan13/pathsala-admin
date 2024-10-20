"use client";

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { Input } from "@/components/Reusable/Input";
import { TextareaInput } from "@/components/Reusable/TextAreaInput";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks/hooks";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { addProduct, fetchCategories, AddProduct } from "@/app/store/dataSlice";
import { Category } from "@/app/types/data";
import { Status } from "@/app/types/status";
import { redirect } from "next/navigation";

const AddProducts = () => {
  const dispatch = useAppDispatch();
  const { status } = useAppSelector((state) => state.datas);
  const { categories } = useAppSelector((state) => state.datas);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const [formData, setFormData] = useState<AddProduct>({
    productName: "",
    productPrice: 0,
    productDescription: "",
    productTotalStockQty: 0,
    categoryId: "",
    productImageUrl: null,
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value, files } = e.target as HTMLInputElement;
    setFormData({
      ...formData,
      [name]: name === "productImageUrl" ? files?.[0] : value,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("formdata", formData);
    // await dispatch(addProduct(formData));
    // if (Status.SUCCESS === status) {
    //   redirect("/tables");
    // } else {
    //   redirect("/forms/form-layout");
    // }
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Add Product" />

      <div className="flex flex-col gap-9">
        {/* <!-- Contact Form --> */}
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white">
              Contact Form
            </h3>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="p-6.5 ">
              <div className="mb-4.5  flex flex-col gap-6 xl:flex-row">
                <Input
                  label="Product Name"
                  name="productName"
                  onChange={handleChange}
                  placeholder="Enter your Product name"
                />{" "}
                <div>
                  <div className="w-full">
                    <label className="text-gray-900 mb-2 block text-sm font-medium">
                      Category
                    </label>

                    <select
                      name="categoryId"
                      onChange={handleChange}
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    >
                      {categories?.map((option: Category) => (
                        <option key={option.id} value={option.id}>
                          {option.categoryName}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              <div className="mb-4.5">
                <TextareaInput
                  label="Description"
                  name="productDescription"
                  onChange={handleChange}
                  placeholder="Write about your product..."
                />
              </div>
              <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                <Input
                  label="Price"
                  name="productPrice"
                  onChange={handleChange}
                  type="number"
                />
                <Input
                  label="Stock"
                  name="productTotalStockQty"
                  onChange={handleChange}
                  type="number"
                />
              </div>

              <div className="mb-4.5">
                <Input
                  onChange={handleChange}
                  type="file"
                  name="productImageUrl"
                  accept="image/*"
                  label="Insert your Product Image"
                />
              </div>

              <button className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default AddProducts;
