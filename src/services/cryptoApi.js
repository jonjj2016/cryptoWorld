import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

const cryptoHeaders = {
    'x-rapidapi-host': 'coinranking1.p.rapidapi.com',
    'x-rapidapi-key': '80126376b4mshbd6b74ee3a99415p19c81ajsn94fb4f01e676'
};
const baseUrl = 'https://coinranking1.p.rapidapi.com/';

const createRequest = (url) => ({url, headers: cryptoHeaders});

export const  cryptoApi = createApi({
    reducerPath: 'cryptoApi',
    baseQuery: fetchBaseQuery({
        baseUrl
    }),
    endpoints: (builder) => ({
        getCryptos: builder.query({
            query: (count) => createRequest(`/coins?limit=${count}`)
        }),
    }),
});
export const {
    useGetCryptosQuery,
} = cryptoApi;
// https://coinranking1.p.rapidapi.com/coins