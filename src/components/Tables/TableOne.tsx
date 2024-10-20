"use client";

import { fetchUsers } from "@/app/store/dataSlice";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks/hooks";
import { BRAND } from "@/types/brand";
import Image from "next/image";
import { useEffect } from "react";

export const Users = () => {
  const dispatch = useAppDispatch();
  const { status, users } = useAppSelector((state) => state.datas);
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);
  console.log("users", users);
  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
        Users
      </h4>

      <div className="flex flex-col">
        <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-5">
          <div className="p-2.5 xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">Id</h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Name
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Email
            </h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Created At
            </h5>
          </div>
        </div>

        {users.length > 0 &&
          users.map((brand, key) => (
            <div
              className={`grid grid-cols-3 sm:grid-cols-5 ${
                key === users.length - 1
                  ? ""
                  : "border-b border-stroke dark:border-strokedark"
              }`}
              key={key}
            >
              <div className="flex items-center gap-3 p-2.5 xl:p-5">
                {/* <div className="flex-shrink-0">
                  <Image src={brand.logo} alt="Brand" width={48} height={48} />
                </div> */}
                <p className="hidden text-black dark:text-white sm:block">
                  {brand.id}
                </p>
              </div>

              <div className="flex items-center justify-center p-2.5 xl:p-5">
                <p className="text-black dark:text-white">{brand.email}K</p>
              </div>

              <div className="flex items-center justify-center p-2.5 xl:p-5">
                <p className="capitalize text-meta-3">{brand.username}</p>
              </div>

              <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
                <p className="text-black dark:text-white">{brand.updatedAt}</p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};
