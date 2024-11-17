"use client";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks/hooks";
import React, { ChangeEvent, useEffect, useState } from "react";
import { OrderStatus, PaymentStatus } from "@/app/types/data";
import {
  handleOrderStatusById,
  singleOrder,
  handlePaymentStatusById,
} from "@/app/store/dataSlice";
import { socket } from "@/app/provider";

const SingleOrder = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const dispatch = useAppDispatch();
  const {
    singleOrder: [order],
  } = useAppSelector((state) => state.datas);

  const [orderStatus, setOrderStatus] = useState(
    order?.Order?.orderStatus as string,
  );
  const [paymentStatus, setPaymentStatus] = useState(
    order?.Order?.Payment.paymentStatus as string,
  );

  useEffect(() => {
    if (id) {
      dispatch(singleOrder(id));
    }
  }, []);

  const handleOrderStatus = (e: ChangeEvent<HTMLSelectElement>) => {
    setOrderStatus(e.target.value);
    if (id) {
      socket.emit("updateOrderStatus", {
        status: e.target.value,
        orderId: id,
        userId: order.Order.userId,
      });
      dispatch(handleOrderStatusById(e.target.value as OrderStatus, id));
    }
  };

  const handlePaymentStatus = (e: ChangeEvent<HTMLSelectElement>) => {
    setPaymentStatus(e.target.value);

    if (id) {
      socket.emit("updatePaymentStatus", {
        status: e.target.value,
        orderId: id,
        userId: order.Order.userId,
      });
      dispatch(handlePaymentStatusById(e.target.value as PaymentStatus, id));
    }
  };

  return (
    <div className="px-4 py-20 2xl:container md:px-6 2xl:mx-auto 2xl:px-20">
      <div className="item-start flex flex-col justify-start space-y-5">
        <h1 className="text-1xl text-gray-600 font-semibold leading-7 dark:text-white lg:text-2xl lg:leading-9">
          Order {id}
        </h1>
        <p className="dark:text-gray-300 text-gray-600 text-base font-medium leading-6">
          {order?.createdAt}
        </p>
      </div>
      <div className="jusitfy-center mt-10 flex w-full flex-col items-stretch space-y-4 md:space-y-6 xl:flex-row xl:space-x-8 xl:space-y-0">
        <div className="flex w-full flex-col items-start justify-start space-y-4 md:space-y-6 xl:space-y-8">
          <div className="dark:bg-gray-800 bg-gray-50 flex w-full flex-col items-start justify-start px-4 py-4 md:p-6 md:py-6 xl:p-8">
            <p className="text-gray-800 text-lg font-semibold leading-6 dark:text-white md:text-xl xl:leading-5">
              My Order
            </p>

            <div className="mt-4 flex w-full flex-col items-start justify-start md:mt-6 md:flex-row md:items-center md:space-x-6 xl:space-x-8">
              <div className="w-full pb-4 md:w-40 md:pb-8">
                <img className="hidden w-full md:block" alt="dress" />
                <img
                  className="w-full md:hidden"
                  src={order?.Product?.productImageUrl}
                  alt="dress"
                />
              </div>
              <div className="border-gray-200 flex w-full flex-col items-start justify-between space-y-4 border-b pb-8 md:flex-row md:space-y-0">
                <div className="flex w-full flex-col items-start justify-start space-y-8">
                  <h3 className="text-gray-800 text-xl font-semibold leading-6 dark:text-white xl:text-2xl">
                    {order?.Product?.productName}
                  </h3>
                </div>
                <div className="flex w-full items-start justify-between space-x-8">
                  <p className="text-base leading-6 dark:text-white xl:text-lg">
                    Rs. {order?.Product?.productPrice}{" "}
                  </p>
                  <p className="text-gray-800 text-base leading-6 dark:text-white xl:text-lg">
                    Qty: {order?.quantity}{" "}
                  </p>
                  <p className="text-gray-800 text-base font-semibold leading-6 dark:text-white xl:text-lg">
                    Rs.{order?.Product?.productPrice * order?.quantity}{" "}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex w-full flex-col items-stretch justify-center space-y-4 md:flex-row md:space-x-6 md:space-y-0 xl:space-x-8">
            <div className="bg-gray-50 dark:bg-gray-800 flex w-full flex-col space-y-6 px-4 py-6 md:p-6 xl:p-8">
              <h3 className="text-gray-800 text-xl font-semibold leading-5 dark:text-white">
                Summary
              </h3>
              <div className="border-gray-200 flex w-full flex-col items-center justify-center space-y-4 border-b pb-4">
                <div className="flex w-full items-center justify-between">
                  <p className="text-gray-800 text-base leading-4 dark:text-white">
                    Payment Method
                  </p>
                  <p className="dark:text-gray-300 text-gray-600 text-base leading-4">
                    {order?.Order?.Payment?.paymentMethod}
                  </p>
                </div>
                <div className="flex w-full items-center justify-between">
                  <p className="text-gray-800 text-base leading-4 dark:text-white">
                    Payment Status
                  </p>
                  <p className="dark:text-gray-300 text-gray-600 text-base leading-4">
                    {order?.Order?.Payment?.paymentStatus}
                  </p>
                </div>
                <div className="flex w-full items-center justify-between">
                  <p className="text-gray-800 text-base leading-4 dark:text-white">
                    Order Status
                  </p>
                  <p className="dark:text-gray-300 text-gray-600 text-base leading-4">
                    {order?.Order?.orderStatus}
                  </p>
                </div>
              </div>
              <div className="flex w-full items-center justify-between">
                <p className="text-gray-800 text-base font-semibold leading-4 dark:text-white">
                  Total
                </p>
                <p className="dark:text-gray-300 text-gray-600 text-base font-semibold leading-4">
                  {100 + order?.quantity * order?.Product?.productPrice}
                </p>
              </div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 flex w-full flex-col justify-center space-y-6 px-4 py-6 md:p-6 xl:p-8">
              <h3 className="text-gray-800 text-xl font-semibold leading-5 dark:text-white">
                Shipping
              </h3>
              <div className="flex w-full items-start justify-between">
                <div className="flex items-center justify-center space-x-4">
                  <div className="h-8 w-8">
                    <img
                      className="h-full w-full"
                      alt="logo"
                      src="https://i.ibb.co/L8KSdNQ/image-3.png"
                    />
                  </div>
                  <div className="flex flex-col items-center justify-start">
                    <p className="text-gray-800 text-lg font-semibold leading-6 dark:text-white">
                      Delivery Charge
                      <br />
                      <span className="font-normal">
                        Delivery with 24 Hours
                      </span>
                    </p>
                  </div>
                </div>
                <p className="text-gray-800 text-lg font-semibold leading-6 dark:text-white">
                  Rs 100
                </p>
              </div>
            </div>
          </div>
        </div>
        <div
          className="bg-gray-50 dark:bg-gray-800 flex w-full flex-col items-center justify-between px-4 py-2 md:items-start md:p-1 xl:w-96 xl:p-8"
          style={{ height: "200px" }}
        >
          <h3 className="text-gray-800 text-xl font-semibold leading-5 dark:text-white">
            Customer
          </h3>
          <div className="flex h-full w-full flex-col items-stretch justify-start md:flex-row md:space-x-6 lg:space-x-8 xl:flex-col xl:space-x-0">
            <div className="mt-6 flex w-full flex-col items-stretch justify-between md:mt-0 xl:h-full">
              <div className="flex flex-col items-center justify-center space-y-4 md:flex-row md:items-start md:justify-start md:space-x-6 md:space-y-0 lg:space-x-8 xl:flex-col xl:space-x-0 xl:space-y-12">
                <div className="flex flex-col items-center justify-center space-y-4 md:items-start md:justify-start xl:mt-8">
                  <p className="dark:text-gray-300 text-gray-600 w-48 text-center text-sm leading-5 md:text-left lg:w-full xl:w-48">
                    UserName : test
                  </p>
                  <p className="text-gray-800 text-center text-base font-semibold leading-4 dark:text-white md:text-left">
                    Address : itahari
                  </p>
                  <p className="dark:text-gray-300 text-gray-600 w-48 text-center text-sm leading-5 md:text-left lg:w-full xl:w-48">
                    Phone : 9123123
                  </p>
                </div>
              </div>
              <div className="flex w-full items-center justify-center md:items-start md:justify-start">
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    padding: "18px",
                  }}
                >
                  <div>
                    <label
                      htmlFor="countries"
                      className="text-gray-900 mb-2 block text-sm font-medium dark:text-white"
                    >
                      Select Order Status
                    </label>
                    <select
                      id="countries"
                      className="bg-gray-50 border-gray-300 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 block w-full rounded-lg border p-2.5 text-sm focus:border-blue-500 focus:ring-blue-500 dark:text-white dark:focus:border-blue-500 dark:focus:ring-blue-500"
                      onChange={handleOrderStatus}
                    >
                      {/* <option value={filteredOrder?.orderStatus}>{filteredOrder?.orderStatus}</option> */}
                      <option value="pending">pending</option>
                      <option value="delivered">Delivered</option>

                      <option value="ontheway">Ontheway</option>
                      <option value="preparation">Preparation</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="countries"
                      className="text-gray-900 mb-2 block text-sm font-medium dark:text-white"
                    >
                      Select Payment Status
                    </label>
                    <select
                      onChange={handlePaymentStatus}
                      id="countries"
                      className="bg-gray-50 border-gray-300 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 block w-full rounded-lg border p-2.5 text-sm focus:border-blue-500 focus:ring-blue-500 dark:text-white dark:focus:border-blue-500 dark:focus:ring-blue-500"
                    >
                      <option value="pending">pending</option>
                      <option value="paid">paid</option>
                      <option value="unpaid">unpaid</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="flex w-full items-center justify-center md:items-start md:justify-start">
                <button
                  className="dark:hover:bg-gray-900 hover:bg-gray-200 focus:ring-gray-800 border-gray-800 text-gray-800 mt-6 w-96 border py-3 text-base font-medium font-medium leading-4 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:border-white dark:bg-transparent dark:text-white md:mt-0 2xl:w-full"
                  style={{
                    marginTop: "10px",
                    backgroundColor: "red",
                    color: "white",
                  }}
                >
                  Delete Order
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleOrder;
