import axiosInstance from "@/1_app/api/axios";

export const getProjectData = async () =>
    axiosInstance.get<any[]>('/data');
