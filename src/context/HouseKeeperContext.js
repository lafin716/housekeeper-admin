import React from "react";
import axios from 'axios';

// API 정보
const PATH_HOUSE = '/house';
const PATH_HOUSE_LIST = PATH_HOUSE + '/list';

// 기본 API 통신 axios 객체
const apiClient = axios.create({
    baseURL: '/api',
    timeout: 180000,
    withCredentials: false,
    headers: {
        "Content-Type": "application/json",
        "X-AUTH-TOKEN": localStorage.getItem('accessToken')
    }
});

// 하우스 리스트 조회
async function getHouseList() {
    let response = await apiClient.get(PATH_HOUSE_LIST);

    return response;
}

export { getHouseList };