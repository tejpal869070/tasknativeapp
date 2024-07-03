import axios from "axios";
import { api } from "../config/api";
import * as SecureStore from "expo-secure-store";

export const userLogin = async (formData) => {
  const postData = {
    mobile: formData.mobile,
    password: formData.password,
  };

  try {
    const response = await axios.post(`${api.API_URL}user/login`, postData);
    return response;
  } catch (error) {
    return error;
  }
};

export const GetDepositMethod = async (formData) => {
  const mobile = await SecureStore.getItemAsync("mobile");
  const token = await SecureStore.getItemAsync("token");
  const postData = {
    mobile: mobile,
  };

  const axiosConfig = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(
    `${api.API_URL}user/get-pay-method`,
    postData,
    axiosConfig
  );
  return response;
};

export const GetUserDetails = async () => {
  const mobile = await SecureStore.getItemAsync("mobile");
  const token = await SecureStore.getItemAsync("token");
  const postData = {
    mobile: mobile,
  };

  const axiosConfig = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(
    `${api.API_URL}user/user-details`,
    postData,
    axiosConfig
  );
  return response;
};

export const WithdrawRequest = async (amount) => {
  const mobile = await SecureStore.getItemAsync("mobile");
  const token = await SecureStore.getItemAsync("token");
  const postData = {
    mobile: mobile,
    amount: amount,
  };

  const axiosConfig = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(
    `${api.API_URL}user/add-withdrawal-request`,
    postData,
    axiosConfig
  );

  return response;
};

export const GetUserPaymentHistory = async () => {
  const mobile = await SecureStore.getItemAsync("mobile");
  const token = await SecureStore.getItemAsync("token");
  const postData = {
    mobile: mobile,
  };

  const axiosConfig = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(
    `${api.API_URL}user/get-deposit-request`,
    postData,
    axiosConfig
  );

  return response;
};

export const CancelWithdrawalRequest = async (formData) => {
  const mobile = await SecureStore.getItemAsync("mobile");
  const token = await SecureStore.getItemAsync("token");
  const postData = {
    mobile: mobile,
    id: formData.id,
  };

  const axiosConfig = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(
    `${api.API_URL}user/decline-withdrawal-request`,
    postData,
    axiosConfig
  );
  return response;
};

export const userRegistration = async (userData) => {
  try {
    const postData = {
      user_name: userData.userName,
      mobile: userData.mobile,
      password: userData.password,
      reffer_by: userData.reffer_by,
      email: userData.email,
    };

    const response = await axios.post(`${api.API_URL}user/register`, postData);
    if (response) {
      return response;
    } else {
      return <p>Response not got form server</p>;
    }
  } catch (error) {
    return error;
  }
};

export const CheckUserToken = async (token, mobile) => {
  const postData = {
    mobile: mobile,
    token: token,
  };
  const axiosConfig = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(
    `${api.API_URL}user/token-check`,
    postData,
    axiosConfig
  );
  return response;
};

export const UpdateUserDetail = async (formData) => {
  const mobile = await SecureStore.getItemAsync("mobile");
  const token = await SecureStore.getItemAsync("token");

  const postData = {
    mobile: mobile,
    email: formData.email,
    username: formData.uname,
    upi_id: formData.upi_id,
    pincode: "",
    bank_name: formData.bank_name,
    ifsc_code: formData.ifsc_code,
    ac_no: formData.ac_no,
    ac_name: formData.ac_name,
  };

  const axiosConfig = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(
    `${api.API_URL}user/update-user-details`,
    postData,
    axiosConfig
  );

  if (response) {
    return response.data;
  }
  return null;
};

export const GetPlanBuyHistory = async (formData) => {
  const mobile = await SecureStore.getItemAsync("mobile");
  const token = await SecureStore.getItemAsync("token");
  const postData = {
    mobile: mobile,
  };

  const axiosConfig = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const data = await axios.post(
    `${api.API_URL}user/get-current-plans`,
    postData,
    axiosConfig
  );
  return data;
};

export const GetPlanDetails = async () => {
  const response = await axios.post(`${api.API_URL}user/get-plans`);
  return response.data.data;
};

export const BuyPlan = async (formData) => {
  const mobile = await SecureStore.getItemAsync("mobile");
  const token = await SecureStore.getItemAsync("token");
  const postData = {
    mobile: mobile,
    id: formData.id,
  };

  const axiosConfig = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(
    `${api.API_URL}user/buy-plan`,
    postData,
    axiosConfig
  );
  return response;
};

export const ChangeUserPassword = async (formData) => {
  const mobile = await SecureStore.getItemAsync("mobile");
  const token = await SecureStore.getItemAsync("token");
  const postData = {
    mobile: mobile,
    password: formData.password,
    new_password: formData.new_password,
  };

  const axiosConfig = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(
    `${api.API_URL}user/change-password`,
    postData,
    axiosConfig
  );

  return response.data;
};

export const GetLikeTasks = async () => {
  const mobile = await SecureStore.getItemAsync("mobile");
  const token = await SecureStore.getItemAsync("token");
  const postData = {
    mobile: mobile,
  };

  const axiosConfig = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(
    `${api.API_URL}user/get-task-like`,
    postData,
    axiosConfig
  );

  return response;
};

export const GetCommentTasks = async (formData) => {
  const mobile = await SecureStore.getItemAsync("mobile");
  const token = await SecureStore.getItemAsync("token");
  const postData = {
    mobile: mobile,
  };

  const axiosConfig = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(
    `${api.API_URL}user/get-task-comment`,
    postData,
    axiosConfig
  );
  return response;
};

export const GetVideoTasks = async (formData) => {
  const mobile = await SecureStore.getItemAsync("mobile");
  const token = await SecureStore.getItemAsync("token");
  const postData = {
    mobile: mobile,
  };

  const axiosConfig = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(
    `${api.API_URL}user/get-video-task`,
    postData,
    axiosConfig
  );
  return response;
};

export const DepositRequest = async (formData, selectedImage) => {
  try {
    const mobile = await SecureStore.getItemAsync("mobile");
    const token = await SecureStore.getItemAsync("token");

    const formDataToSend = new FormData();
    formDataToSend.append("transection_id", formData.transection_id);
    formDataToSend.append("mobile", mobile);
    formDataToSend.append("d_image", {
      uri: selectedImage.uri,
      type: "image/jpeg",
      name: "hhh.jpg",
    });
    formDataToSend.append("amount", formData.amount);
    formDataToSend.append("id", formData.id);

    const axiosConfig = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    };

    const response = await axios.post(
      `${api.API_URL}user/deposit-request`,
      formDataToSend,
      axiosConfig
    );

    return response;
  } catch (error) {
    // Handle errors here
    console.error("Error in DepositRequest:", error);
    throw error; // Re-throw the error to propagate it upwards if needed
  }
};

export const UpdateLikeCommentTask = async (userName, id) => {
  try {
    const mobile = await SecureStore.getItemAsync("mobile");
    const token = await SecureStore.getItemAsync("token");

    const postData = {
      mobile: mobile,
      id: id,
      username: userName,
    };

    const axiosConfig = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axios.post(
      `${api.API_URL}user/update-task`,
      postData,
      axiosConfig
    );

    // Handle response
    if (response.status === 200) {
      return response.data;
    } else {
      console.error("Failed to update task. Status code:", response.status);
      // Handle other status codes as needed
    }
  } catch (error) {
    console.error("An error occurred while updating task:", error.message);
    throw error;
  }
};

export const GetWinningWalletHistory = async () => {
  try {
    const mobile = await SecureStore.getItemAsync("mobile");
    const token = await SecureStore.getItemAsync("token");
    const postData = {
      mobile: mobile,
    };

    const axiosConfig = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.post(
      `${api.API_URL}user/get-statement`,
      postData,
      axiosConfig
    );

    if (response) {
      return response.data;
    } else {
      return <p>Response not got form server</p>;
    }
  } catch (error) {
    return error;
  }
};

export const GetReferData = async () => {
  try {
    const mobile = await SecureStore.getItemAsync("mobile");
    const token = await SecureStore.getItemAsync("token");
    const postData = {
      mobile: mobile,
    };
    const axiosConfig = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.post(
      `${api.API_URL}user/get-level`,
      postData,
      axiosConfig
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const UpdateVideoTask = async (username, id) => {
  try {
    const mobile = await SecureStore.getItemAsync("mobile");
    const token = await SecureStore.getItemAsync("token");
    const postData = {
      mobile: mobile,
      id: id,
      url: username,
    };

    const axiosConfig = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.post(
      `${api.API_URL}user/update-video-task`,
      postData,
      axiosConfig
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
