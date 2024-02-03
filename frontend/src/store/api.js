import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:8080/api'
})

export const api = createApi({
    reducerPath: 'api',
    tagTypes: ['Events', 'Groups', 'Types', 'Speakers'],
    baseQuery: baseQuery,
    endpoints: (build) => ({

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
            invalidatesTags: [{type: 'Groups'}]
        }),

        getGroup: build.query({
            query: (idx) => ({
                url: `/groups/${idx}`,
                method: 'GET',
            }),
            invalidatesTags: [{type: 'Groups'}]
        }),

        getTypes: build.query({
            query: () => ({
                url: `/types`,
                method: 'GET',
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
    useGetGroupsQuery,
    useGetSpeakersQuery,
    useGetTypesQuery,
    useDeleteEventMutation,
    useLazyGetGroupQuery,
    useLazyGetTypeQuery,
    useLazyGetSpeakerQuery,
} = api