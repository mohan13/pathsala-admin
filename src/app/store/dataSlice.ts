import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  InitialState,
  OrderData,
  Category,
  Product,
  User,
  SingleOrder,
  OrderStatus,
} from "../types/data";
import { Status } from "../types/status";
import { AppDispatch } from "./store";
import { APIauthenticated, API } from "@/http";

const initialState: InitialState = {
  orders: [],
  products: [],
  users: [],
  categories: [],
  singleOrder: [],
  singleProduct: null,
  status: Status.LOADING,
};
interface DeleteProduct {
  productId: string;
}
interface DeleteUser {
  userId: string;
}
interface DeleteOrder {
  orderId: string;
}
interface DeleteCategory {
  categoryId: string;
}

export interface AddProduct {
  productName: string;
  productDescription: string;
  productPrice: number;
  productTotalStockQty: number;
  productImageUrl: null;
  categoryId: string;
}

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setStatus(state: InitialState, action: PayloadAction<Status>) {
      state.status = action.payload;
    },
    setProduct(state: InitialState, action: PayloadAction<Product[]>) {
      state.products = action.payload;
    },

    setSingleProduct(state: InitialState, action: PayloadAction<Product>) {
      state.singleProduct = action.payload;
    },

    setDeleteProduct(
      state: InitialState,
      action: PayloadAction<DeleteProduct>,
    ) {
      const index = state.products.findIndex(
        (item) => (item.id = action.payload.productId),
      );
      state.products.splice(index, 1);
    },

    setOrders(state: InitialState, action: PayloadAction<OrderData[]>) {
      state.orders = action.payload;
    },

    setCategories(state: InitialState, action: PayloadAction<Category[]>) {
      state.categories = action.payload;
    },

    setUsers(state: InitialState, action: PayloadAction<User[]>) {
      state.users = action.payload;
    },

    setDeleteUser(state: InitialState, action: PayloadAction<DeleteUser>) {
      const index = state.users.findIndex(
        (item) => (item.id = action.payload.userId),
      );
      state.users.splice(index, 1);
    },
    setDeleteOrder(state: InitialState, action: PayloadAction<DeleteOrder>) {
      const index = state.orders.findIndex(
        (item) => (item.id = action.payload.orderId),
      );
      state.orders.splice(index, 1);
    },
    setDeleteCategory(
      state: InitialState,
      action: PayloadAction<DeleteCategory>,
    ) {
      const index = state.categories.findIndex(
        (item) => (item.id = action.payload.categoryId),
      );
      state.categories.splice(index, 1);
    },
    setSingleOrder(state: InitialState, action: PayloadAction<SingleOrder[]>) {
      state.singleOrder = action.payload;
    },
    updateOrderStatusById(
      state: InitialState,
      action: PayloadAction<{ orderId: string; status: OrderStatus }>,
    ) {
      const index = state.singleOrder.findIndex(
        (order) => (order.id = action.payload.orderId),
      );
      if (index !== -1) {
        state.singleOrder[index].Order.orderStatus = action.payload
          .status as OrderStatus;
      }
    },
  },
});

export const {
  setOrders,
  setCategories,
  setSingleOrder,
  setDeleteCategory,
  setProduct,
  setStatus,
  setUsers,
  setSingleProduct,
  setDeleteProduct,
  setDeleteUser,
  setDeleteOrder,
  updateOrderStatusById,
} = dataSlice.actions;
export default dataSlice.reducer;

//Products
export const addProduct = (data: AddProduct) => {
  return async (dispatch: AppDispatch) => {
    dispatch(setStatus(Status.LOADING));
    try {
      const response = await APIauthenticated.post("/admin/product", data);

      if (response.status === 200) {
        dispatch(setStatus(Status.SUCCESS));
      } else {
        dispatch(setStatus(Status.FAILURE));
      }
    } catch (error) {
      console.log("RTK ERROR:", error);
      dispatch(setStatus(Status.FAILURE));
    }
  };
};

export const deleteProduct = (id: string) => {
  return async (dispatch: AppDispatch) => {
    dispatch(setStatus(Status.LOADING));
    try {
      const response = await APIauthenticated.delete("/admin/product/" + id);

      if (response.status === 200) {
        const { data } = response.data;
        dispatch(setStatus(Status.SUCCESS));
        dispatch(setProduct(data));
      } else {
        dispatch(setStatus(Status.FAILURE));
      }
    } catch (error) {
      console.log("RTK ERROR:", error);
      dispatch(setStatus(Status.FAILURE));
    }
  };
};

export const singleProduct = (id: string) => {
  return async (dispatch: AppDispatch) => {
    dispatch(setStatus(Status.LOADING));
    try {
      const response = await APIauthenticated.post("/admin/product/" + id);

      if (response.status === 200) {
        const { data } = response.data;
        dispatch(setStatus(Status.SUCCESS));
        dispatch(setSingleProduct(data));
      } else {
        dispatch(setStatus(Status.FAILURE));
      }
    } catch (error) {
      console.log("RTK ERROR:", error);
      dispatch(setStatus(Status.FAILURE));
    }
  };
};

export const fetchProducts = () => {
  return async (dispatch: AppDispatch) => {
    dispatch(setStatus(Status.LOADING));
    try {
      const response = await APIauthenticated.get("/admin/product");

      if (response.status === 200) {
        const { data } = response.data;
        dispatch(setStatus(Status.SUCCESS));
        dispatch(setProduct(data));
      } else {
        dispatch(setStatus(Status.FAILURE));
      }
    } catch (error) {
      console.log("RTK ERROR:", error);
      dispatch(setStatus(Status.FAILURE));
    }
  };
};

//orders

export const fetchOrderItems = () => {
  return async (dispatch: AppDispatch) => {
    dispatch(setStatus(Status.LOADING));
    try {
      const response = await APIauthenticated.get("/order");

      if (response.status === 200) {
        const { data } = response.data;
        dispatch(setStatus(Status.SUCCESS));
        dispatch(setOrders(data));
      } else {
        dispatch(setStatus(Status.FAILURE));
      }
    } catch (error) {
      console.log("RTK ERROR:", error);
      dispatch(setStatus(Status.FAILURE));
    }
  };
};

export function singleOrder(id: string) {
  return async function singleOrderThunk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const response = await APIauthenticated.get("/order/my-order/" + id);
      if (response.status === 200) {
        dispatch(setStatus(Status.SUCCESS));
        dispatch(setSingleOrder(response.data.data));
      } else {
        dispatch(setStatus(Status.FAILURE));
      }
    } catch (error) {
      dispatch(setStatus(Status.FAILURE));
    }
  };
}

export function handleOrderStatusById(status: OrderStatus, id: string) {
  return async function orderStatusThunk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const response = await APIauthenticated.patch("/order/admin/" + id, {
        orderStatus: status,
      });
      if (response.status === 200) {
        dispatch(setStatus(Status.SUCCESS));
        dispatch(updateOrderStatusById({ orderId: id, status }));
      } else {
        dispatch(setStatus(Status.FAILURE));
      }
    } catch (error) {
      dispatch(setStatus(Status.FAILURE));
    }
  };
}

export function deleteOrder(id: string) {
  return async function deleteProductThunk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const response = await APIauthenticated.delete("/order/admin/" + id);
      if (response.status === 200) {
        dispatch(setStatus(Status.SUCCESS));
        dispatch(setDeleteOrder({ orderId: id }));
      } else {
        dispatch(setStatus(Status.FAILURE));
      }
    } catch (error) {
      dispatch(setStatus(Status.FAILURE));
    }
  };
}

//categories
export function addCategory(data: { categoryName: string }) {
  return async function addCategoryThunk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const response = await APIauthenticated.post("/admin/category", data);
      if (response.status === 200) {
        dispatch(setStatus(Status.SUCCESS));
        setCategories(response.data.data);
      } else {
        dispatch(setStatus(Status.FAILURE));
      }
    } catch (error) {
      dispatch(setStatus(Status.FAILURE));
    }
  };
}

export function fetchCategories() {
  return async function fetchCategoriesThunk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const response = await APIauthenticated.get("admin/category");
      if (response.status === 200) {
        const { data } = response.data;
        dispatch(setStatus(Status.SUCCESS));
        dispatch(setCategories(data));
      } else {
        dispatch(setStatus(Status.FAILURE));
      }
    } catch (error) {
      dispatch(setStatus(Status.FAILURE));
    }
  };
}

export function deleteCategory(id: string) {
  return async function deleteProductThunk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const response = await APIauthenticated.delete("/admin/category/" + id);
      if (response.status === 200) {
        dispatch(setStatus(Status.SUCCESS));
        dispatch(setDeleteCategory({ categoryId: id }));
      } else {
        dispatch(setStatus(Status.FAILURE));
      }
    } catch (error) {
      dispatch(setStatus(Status.FAILURE));
    }
  };
}

//users
export const fetchUsers = () => {
  return async (dispatch: AppDispatch) => {
    dispatch(setStatus(Status.LOADING));
    try {
      const response = await APIauthenticated.get("/auth/users");

      if (response.status === 200) {
        const { data } = response.data;
        dispatch(setStatus(Status.SUCCESS));
        dispatch(setUsers(data));
      } else {
        dispatch(setStatus(Status.FAILURE));
      }
    } catch (error) {
      console.log("RTK ERROR:", error);
      dispatch(setStatus(Status.FAILURE));
    }
  };
};

export function deleteUser(id: string) {
  return async function deleteUserThunk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const response = await APIauthenticated.delete("/users/" + id);
      if (response.status === 200) {
        dispatch(setStatus(Status.SUCCESS));
        dispatch(setDeleteUser({ userId: id }));
      } else {
        dispatch(setStatus(Status.FAILURE));
      }
    } catch (error) {
      dispatch(setStatus(Status.FAILURE));
    }
  };
}
