import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type Idea = {
  __typename?: 'Idea';
  cost: Scalars['Float'];
  createdAt: Scalars['String'];
  description: Scalars['String'];
  id: Scalars['Float'];
  likeStatus?: Maybe<Scalars['Boolean']>;
  likes: Array<Like>;
  nbLikes: Scalars['Int'];
  title: Scalars['String'];
  tldr: Scalars['String'];
  updatedAt: Scalars['String'];
  user: User;
  userId: Scalars['Float'];
};

export type Like = {
  __typename?: 'Like';
  idea: Idea;
  ideaId: Scalars['Float'];
  user: User;
  userId: Scalars['Float'];
};

export type Mutation = {
  __typename?: 'Mutation';
  changePassword: UserResponse;
  createIdea?: Maybe<Idea>;
  forgotPassword: Scalars['Boolean'];
  like: Scalars['Boolean'];
  login: UserResponse;
  logout: Scalars['Boolean'];
  register: UserResponse;
};


export type MutationChangePasswordArgs = {
  newPassword: Scalars['String'];
  token: Scalars['String'];
};


export type MutationCreateIdeaArgs = {
  cost: Scalars['Float'];
  description: Scalars['String'];
  title: Scalars['String'];
  tldr: Scalars['String'];
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String'];
};


export type MutationLikeArgs = {
  ideaId: Scalars['Int'];
};


export type MutationLoginArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationRegisterArgs = {
  options: UserInput;
};

export type PaginatedIdeas = {
  __typename?: 'PaginatedIdeas';
  hasMore: Scalars['Boolean'];
  ideas: Array<Idea>;
};

export type Query = {
  __typename?: 'Query';
  currentUser?: Maybe<User>;
  idea?: Maybe<Idea>;
  ideas: PaginatedIdeas;
};


export type QueryIdeaArgs = {
  id: Scalars['Int'];
};


export type QueryIdeasArgs = {
  cursor?: Maybe<Scalars['String']>;
  limit: Scalars['Int'];
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['String'];
  email: Scalars['String'];
  id: Scalars['Float'];
  updatedAt: Scalars['String'];
  username: Scalars['String'];
};

export type UserInput = {
  email: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type ErrorFragFragment = { __typename?: 'FieldError', field: string, message: string };

export type UserFragFragment = { __typename?: 'User', email: string, username: string };

export type UserResponseFragFragment = { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null | undefined, user?: { __typename?: 'User', email: string, username: string } | null | undefined };

export type ChangePasswordMutationVariables = Exact<{
  token: Scalars['String'];
  newPassword: Scalars['String'];
}>;


export type ChangePasswordMutation = { __typename?: 'Mutation', changePassword: { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null | undefined, user?: { __typename?: 'User', email: string, username: string } | null | undefined } };

export type CreateIdeaMutationVariables = Exact<{
  title: Scalars['String'];
  description: Scalars['String'];
  tldr: Scalars['String'];
  cost: Scalars['Float'];
}>;


export type CreateIdeaMutation = { __typename?: 'Mutation', createIdea?: { __typename?: 'Idea', id: number, title: string, tldr: string, userId: number } | null | undefined };

export type ForgotPasswordMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type ForgotPasswordMutation = { __typename?: 'Mutation', forgotPassword: boolean };

export type LikeMutationVariables = Exact<{
  ideaId: Scalars['Int'];
}>;


export type LikeMutation = { __typename?: 'Mutation', like: boolean };

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null | undefined, user?: { __typename?: 'User', email: string, username: string } | null | undefined } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type RegisterMutationVariables = Exact<{
  options: UserInput;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null | undefined, user?: { __typename?: 'User', email: string, username: string } | null | undefined } };

export type CurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type CurrentUserQuery = { __typename?: 'Query', currentUser?: { __typename?: 'User', email: string, username: string } | null | undefined };

export type IdeaQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type IdeaQuery = { __typename?: 'Query', idea?: { __typename?: 'Idea', title: string, description: string, cost: number } | null | undefined };

export type IdeasQueryVariables = Exact<{
  limit: Scalars['Int'];
  cursor?: Maybe<Scalars['String']>;
}>;


export type IdeasQuery = { __typename?: 'Query', ideas: { __typename?: 'PaginatedIdeas', hasMore: boolean, ideas: Array<{ __typename?: 'Idea', id: number, title: string, tldr: string, cost: number, createdAt: string, nbLikes: number, likeStatus?: boolean | null | undefined, user: { __typename?: 'User', id: number, username: string } }> } };

export const ErrorFragFragmentDoc = gql`
    fragment ErrorFrag on FieldError {
  field
  message
}
    `;
export const UserFragFragmentDoc = gql`
    fragment UserFrag on User {
  email
  username
}
    `;
export const UserResponseFragFragmentDoc = gql`
    fragment UserResponseFrag on UserResponse {
  errors {
    ...ErrorFrag
  }
  user {
    ...UserFrag
  }
}
    ${ErrorFragFragmentDoc}
${UserFragFragmentDoc}`;
export const ChangePasswordDocument = gql`
    mutation ChangePassword($token: String!, $newPassword: String!) {
  changePassword(token: $token, newPassword: $newPassword) {
    ...UserResponseFrag
  }
}
    ${UserResponseFragFragmentDoc}`;
export type ChangePasswordMutationFn = Apollo.MutationFunction<ChangePasswordMutation, ChangePasswordMutationVariables>;

/**
 * __useChangePasswordMutation__
 *
 * To run a mutation, you first call `useChangePasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangePasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changePasswordMutation, { data, loading, error }] = useChangePasswordMutation({
 *   variables: {
 *      token: // value for 'token'
 *      newPassword: // value for 'newPassword'
 *   },
 * });
 */
export function useChangePasswordMutation(baseOptions?: Apollo.MutationHookOptions<ChangePasswordMutation, ChangePasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ChangePasswordMutation, ChangePasswordMutationVariables>(ChangePasswordDocument, options);
      }
export type ChangePasswordMutationHookResult = ReturnType<typeof useChangePasswordMutation>;
export type ChangePasswordMutationResult = Apollo.MutationResult<ChangePasswordMutation>;
export type ChangePasswordMutationOptions = Apollo.BaseMutationOptions<ChangePasswordMutation, ChangePasswordMutationVariables>;
export const CreateIdeaDocument = gql`
    mutation CreateIdea($title: String!, $description: String!, $tldr: String!, $cost: Float!) {
  createIdea(title: $title, description: $description, tldr: $tldr, cost: $cost) {
    id
    title
    tldr
    userId
  }
}
    `;
export type CreateIdeaMutationFn = Apollo.MutationFunction<CreateIdeaMutation, CreateIdeaMutationVariables>;

/**
 * __useCreateIdeaMutation__
 *
 * To run a mutation, you first call `useCreateIdeaMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateIdeaMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createIdeaMutation, { data, loading, error }] = useCreateIdeaMutation({
 *   variables: {
 *      title: // value for 'title'
 *      description: // value for 'description'
 *      tldr: // value for 'tldr'
 *      cost: // value for 'cost'
 *   },
 * });
 */
export function useCreateIdeaMutation(baseOptions?: Apollo.MutationHookOptions<CreateIdeaMutation, CreateIdeaMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateIdeaMutation, CreateIdeaMutationVariables>(CreateIdeaDocument, options);
      }
export type CreateIdeaMutationHookResult = ReturnType<typeof useCreateIdeaMutation>;
export type CreateIdeaMutationResult = Apollo.MutationResult<CreateIdeaMutation>;
export type CreateIdeaMutationOptions = Apollo.BaseMutationOptions<CreateIdeaMutation, CreateIdeaMutationVariables>;
export const ForgotPasswordDocument = gql`
    mutation ForgotPassword($email: String!) {
  forgotPassword(email: $email)
}
    `;
export type ForgotPasswordMutationFn = Apollo.MutationFunction<ForgotPasswordMutation, ForgotPasswordMutationVariables>;

/**
 * __useForgotPasswordMutation__
 *
 * To run a mutation, you first call `useForgotPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useForgotPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [forgotPasswordMutation, { data, loading, error }] = useForgotPasswordMutation({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useForgotPasswordMutation(baseOptions?: Apollo.MutationHookOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ForgotPasswordMutation, ForgotPasswordMutationVariables>(ForgotPasswordDocument, options);
      }
export type ForgotPasswordMutationHookResult = ReturnType<typeof useForgotPasswordMutation>;
export type ForgotPasswordMutationResult = Apollo.MutationResult<ForgotPasswordMutation>;
export type ForgotPasswordMutationOptions = Apollo.BaseMutationOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables>;
export const LikeDocument = gql`
    mutation Like($ideaId: Int!) {
  like(ideaId: $ideaId)
}
    `;
export type LikeMutationFn = Apollo.MutationFunction<LikeMutation, LikeMutationVariables>;

/**
 * __useLikeMutation__
 *
 * To run a mutation, you first call `useLikeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLikeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [likeMutation, { data, loading, error }] = useLikeMutation({
 *   variables: {
 *      ideaId: // value for 'ideaId'
 *   },
 * });
 */
export function useLikeMutation(baseOptions?: Apollo.MutationHookOptions<LikeMutation, LikeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LikeMutation, LikeMutationVariables>(LikeDocument, options);
      }
export type LikeMutationHookResult = ReturnType<typeof useLikeMutation>;
export type LikeMutationResult = Apollo.MutationResult<LikeMutation>;
export type LikeMutationOptions = Apollo.BaseMutationOptions<LikeMutation, LikeMutationVariables>;
export const LoginDocument = gql`
    mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    ...UserResponseFrag
  }
}
    ${UserResponseFragFragmentDoc}`;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const RegisterDocument = gql`
    mutation Register($options: UserInput!) {
  register(options: $options) {
    ...UserResponseFrag
  }
}
    ${UserResponseFragFragmentDoc}`;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      options: // value for 'options'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, options);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const CurrentUserDocument = gql`
    query CurrentUser {
  currentUser {
    ...UserFrag
  }
}
    ${UserFragFragmentDoc}`;

/**
 * __useCurrentUserQuery__
 *
 * To run a query within a React component, call `useCurrentUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useCurrentUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCurrentUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useCurrentUserQuery(baseOptions?: Apollo.QueryHookOptions<CurrentUserQuery, CurrentUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CurrentUserQuery, CurrentUserQueryVariables>(CurrentUserDocument, options);
      }
export function useCurrentUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CurrentUserQuery, CurrentUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CurrentUserQuery, CurrentUserQueryVariables>(CurrentUserDocument, options);
        }
export type CurrentUserQueryHookResult = ReturnType<typeof useCurrentUserQuery>;
export type CurrentUserLazyQueryHookResult = ReturnType<typeof useCurrentUserLazyQuery>;
export type CurrentUserQueryResult = Apollo.QueryResult<CurrentUserQuery, CurrentUserQueryVariables>;
export const IdeaDocument = gql`
    query Idea($id: Int!) {
  idea(id: $id) {
    title
    description
    cost
  }
}
    `;

/**
 * __useIdeaQuery__
 *
 * To run a query within a React component, call `useIdeaQuery` and pass it any options that fit your needs.
 * When your component renders, `useIdeaQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useIdeaQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useIdeaQuery(baseOptions: Apollo.QueryHookOptions<IdeaQuery, IdeaQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<IdeaQuery, IdeaQueryVariables>(IdeaDocument, options);
      }
export function useIdeaLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<IdeaQuery, IdeaQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<IdeaQuery, IdeaQueryVariables>(IdeaDocument, options);
        }
export type IdeaQueryHookResult = ReturnType<typeof useIdeaQuery>;
export type IdeaLazyQueryHookResult = ReturnType<typeof useIdeaLazyQuery>;
export type IdeaQueryResult = Apollo.QueryResult<IdeaQuery, IdeaQueryVariables>;
export const IdeasDocument = gql`
    query Ideas($limit: Int!, $cursor: String) {
  ideas(limit: $limit, cursor: $cursor) {
    ideas {
      id
      title
      tldr
      cost
      createdAt
      nbLikes
      likeStatus
      user {
        id
        username
      }
    }
    hasMore
  }
}
    `;

/**
 * __useIdeasQuery__
 *
 * To run a query within a React component, call `useIdeasQuery` and pass it any options that fit your needs.
 * When your component renders, `useIdeasQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useIdeasQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      cursor: // value for 'cursor'
 *   },
 * });
 */
export function useIdeasQuery(baseOptions: Apollo.QueryHookOptions<IdeasQuery, IdeasQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<IdeasQuery, IdeasQueryVariables>(IdeasDocument, options);
      }
export function useIdeasLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<IdeasQuery, IdeasQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<IdeasQuery, IdeasQueryVariables>(IdeasDocument, options);
        }
export type IdeasQueryHookResult = ReturnType<typeof useIdeasQuery>;
export type IdeasLazyQueryHookResult = ReturnType<typeof useIdeasLazyQuery>;
export type IdeasQueryResult = Apollo.QueryResult<IdeasQuery, IdeasQueryVariables>;