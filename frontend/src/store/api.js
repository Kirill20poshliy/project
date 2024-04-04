import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { setCredentials, logout } from './adminSlice'

const baseQuery = fetchBaseQuery({
    baseUrl: 'http://91.236.199.149/api',
    credentials: 'include',
    prepareHeaders: (headers, {getState}) => {
        const token = getState().admin.token
        if (token) {
            headers.set('Authorization', `Bearer ${token}`)
        }
        return headers
    }
})

const baseQueryWithReauth = async (args, api, extraOptions) => {
    let res = await baseQuery(args, api, extraOptions)
    if (res?.error) {
        console.log('sending refreshToken')
        const refreshResult = await baseQuery('/refresh', api, extraOptions)
        if(refreshResult?.data) {
            const login = api.getState().admin.login
            api.dispatch(setCredentials({...refreshResult.data, login}))
            res = await baseQuery(args, api, extraOptions)
        } else {
            api.dispatch(logout())
        }
    }
    return res
}

export const api = createApi({
    reducerPath: 'api',
    tagTypes: ['Events', 'Groups', 'Types', 'Speakers', 'Admin'],
    baseQuery: baseQueryWithReauth,
    endpoints: (build) => ({

        registration: build.mutation({
            query: (body) => ({
                url: '/registration',
                method: 'POST',
                body: body
            }),
        }),

        login: build.mutation({
            query: (credentials) => ({
                url: '/login',
                method: 'POST',
                body: credentials
            }),
            invalidatesTags: [{type: 'Admin'}],
        }),

        logout: build.mutation({
            query: () => ({
                url: '/logout',
                method: 'POST',
            }),
            invalidatesTags: [{type: 'Admin'}]
        }),

        refresh: build.query({
            query: () => ({
                url: '/refresh',
                method: 'GET'
            })
        }),

        getEvents: build.query({
            query: () => ({
                url: '/events',
                method: 'GET',
            }),
            providesTags: (result, error, arg) =>
            result
              ? [...result.data.map(({ id }) => ({ type: 'Events', id })), 'Events']
              : ['Events'],
        }),

        createEvent: build.mutation({
            query: (body) => ({
                url: '/events',
                method: 'POST',
                body: body
            }),
            invalidatesTags: [{type: 'Events'}],
        }),

        updateEvent: build.mutation({
            query: ({body, id}) => ({
                url: `/events/${id}`,
                method: 'PATCH',
                body: body
            }),
            invalidatesTags: [{type: 'Events'}],            
        }),

        deleteEvent: build.mutation({
            query: (idx) => ({
                url: `/events/${idx}`,
                method: 'DELETE',
            }),
            invalidatesTags: [{type: 'Events'}]
        }),

        getGroups: build.query({
            query: () => ({
                url: `/groups`,
                method: 'GET',
            }),
            providesTags: (result, error, arg) =>
            result
              ? [...result.data.map(({ id }) => ({ type: 'Groups', id })), 'Groups']
              : ['Groups'],
        }),

        getGroup: build.query({
            query: (idx) => ({
                url: `/groups/${idx}`,
                method: 'GET',
            }),
            invalidatesTags: [{type: 'Groups'}]
        }),

        createGroup: build.mutation({
            query: (body) => ({
                url: `/groups`,
                method: 'POST',
                body: {code: body},
            }),
            invalidatesTags: [{type: 'Groups'}]
        }),

        updateGroup: build.mutation({
            query: ({body, idx}) => ({
                url: `/groups/${idx}`,
                method: 'PATCH',
                body: {code: body},
            }),
            invalidatesTags: [{type: 'Groups'}]
        }),

        deleteGroup: build.mutation({
            query: (idx) => ({
                url: `/groups/${idx}`,
                method: 'DELETE',
            }),
            invalidatesTags: [{type: 'Groups'}]
        }),

        getTypes: build.query({
            query: () => ({
                url: `/types`,
                method: 'GET',
            }),
            providesTags: (result, error, arg) =>
            result
              ? [...result.data.map(({ id }) => ({ type: 'Types', id })), 'Types']
              : ['Types'],
        }),

        createType: build.mutation({
            query: (body) => ({
                url: `/types`,
                method: 'POST',
                body: {name: body},
            }),
            invalidatesTags: [{type: 'Types'}]
        }),

        updateType: build.mutation({
            query: ({body, idx}) => ({
                url: `/types/${idx}`,
                method: 'PATCH',
                body: {name: body},
            }),
            invalidatesTags: [{type: 'Types'}]
        }),

        deleteType: build.mutation({
            query: (idx) => ({
                url: `/types/${idx}`,
                method: 'DELETE',
            }),
            invalidatesTags: [{type: 'Types'}]
        }),

        getType: build.query({
            query: (idx) => ({
                url: `/types/${idx}`,
                method: 'GET',
            }),
            invalidatesTags: [{type: 'Types'}]
        }),

        getSpeakers: build.query({
            query: () => ({
                url: `/speakers`,
                method: 'GET',
            }),
            providesTags: (result, error, arg) =>
            result
              ? [...result.data.map(({ id }) => ({ type: 'Speakers', id })), 'Speakers']
              : ['Speakers'],
        }),

        createSpeaker: build.mutation({
            query: (body) => ({
                url: `/speakers`,
                method: 'POST',
                body: {name: body},
            }),
            invalidatesTags: [{type: 'Speakers'}]
        }),

        updateSpeaker: build.mutation({
            query: ({body, idx}) => ({
                url: `/speakers/${idx}`,
                method: 'PATCH',
                body: {name: body},
            }),
            invalidatesTags: [{type: 'Speakers'}]
        }),

        deleteSpeaker: build.mutation({
            query: (idx) => ({
                url: `/speakers/${idx}`,
                method: 'DELETE',
            }),
            invalidatesTags: [{type: 'Speakers'}]
        }),

        getSpeaker: build.query({
            query: (idx) => ({
                url: `/speakers/${idx}`,
                method: 'GET',
            }),
            invalidatesTags: [{type: 'Speakers'}]
        }),

    })
})

export const {
    useGetEventsQuery,
    useCreateEventMutation,
    useUpdateEventMutation,
    useDeleteEventMutation,

    useGetGroupsQuery,
    useCreateGroupMutation,
    useUpdateGroupMutation,
    useDeleteGroupMutation,

    useGetSpeakersQuery,
    useCreateSpeakerMutation,
    useUpdateSpeakerMutation,
    useDeleteSpeakerMutation,

    useGetTypesQuery,
    useCreateTypeMutation,
    useUpdateTypeMutation,
    useDeleteTypeMutation,

    useLazyGetGroupQuery,
    useLazyGetTypeQuery,
    useLazyGetSpeakerQuery,

    useRegistrationMutation,
    useRefreshQuery,
    useLazyRefreshQuery,
    useLoginMutation,
    useLogoutMutation,
} = api