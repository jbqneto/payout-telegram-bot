import { AxiosResponse } from "axios";
import { ApiResponse } from "../model/api/common";


export function buildResponse(axiosResponse: AxiosResponse): ApiResponse<any> {
    console.log("response data: ", axiosResponse.data);

    return {
        status: axiosResponse.status,
        data: axiosResponse.data
    }
}

export function getNetworkName(chainId: string): string {
    const map: Record<string, string> = {
        '1': 'Ethereum',
        '42161': 'Arbitrum One',
        '137': 'Polygon',
        '10': 'Optimism',
        '8453': 'Base'
    };
    return map[chainId] ?? 'Unknown';
}