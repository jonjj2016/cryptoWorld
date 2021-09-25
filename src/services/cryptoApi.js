import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query';

const cryptoHeaders = {
    'x-rapidapi-host': 'coinranking1.p.rapidapi.com',
    'x-rapidapi-key': '80126376b4mshbd6b74ee3a99415p19c81ajsn94fb4f01e676'
};
const baseUrl = 'https://coinranking1.p.rapidapi.com/exchanges';

const createRequest = (url) => ({url, headers: cryptoHeaders});

export const  cryptoApi = createApi({
    reducerPath: 'cryptoApi',
    baseQuery: fetchBaseQuery({
        baseUrl
    }),
    endpoints: (builder) => ({
        getCryptos: builder.query({
            query: () => createRequest('/coins')
        }),
    }),
});
export const {
    useGetCryptosQuery,
} = cryptoApi;
