/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: any;
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: any;
  /** The javascript `Date` as integer. Type represents date and time as number of milliseconds from start of UNIX epoch. */
  Timestamp: any;
};

export type BarTable = {
  __typename?: 'BarTable';
  id_status?: Maybe<Scalars['Int']>;
  id_tahun?: Maybe<Scalars['Int']>;
  jumlah_izin: Scalars['Int'];
  kode_izin: Scalars['String'];
  nama_izin: Scalars['String'];
  status: Scalars['String'];
  tahun: Scalars['Int'];
};

export type BidangSum = {
  __typename?: 'BidangSum';
  bidang: Scalars['String'];
  id_bidang?: Maybe<Scalars['Int']>;
  id_status?: Maybe<Scalars['Int']>;
  id_tahun?: Maybe<Scalars['Int']>;
  jumlah_izin: Scalars['Int'];
  status: Scalars['String'];
  tahun: Scalars['Int'];
};

export type CreateUsersInput = {
  email: Scalars['String'];
  isActive?: InputMaybe<Scalars['Boolean']>;
  name: Scalars['String'];
  password: Scalars['String'];
  wilayah?: InputMaybe<Scalars['String']>;
};

export type Dashboards = {
  __typename?: 'Dashboards';
  barTableAggregate: Array<StatusGroupAggregate>;
  bidangSumAggregate: Array<SumAggregate>;
  lineStatusAggregate: Array<LineChartAggregate>;
  lineStatusCsv: Array<LineCsvAggregate>;
  pieStatusAggregate: Array<SumAggregate>;
  status: Scalars['String'];
  tahun: Array<Scalars['Int']>;
  totalIzinAggregate: SumAggregate;
};

export type FilterStatus = {
  __typename?: 'FilterStatus';
  id_status: Scalars['Int'];
  status: Scalars['String'];
};

export type FilterTahun = {
  __typename?: 'FilterTahun';
  id_tahun?: Maybe<Scalars['Int']>;
  tahun?: Maybe<Scalars['Int']>;
};

export type FiltersDashboard = {
  __typename?: 'FiltersDashboard';
  status?: Maybe<Array<FilterStatus>>;
  tahun?: Maybe<Array<FilterTahun>>;
};

export type LineChart = {
  __typename?: 'LineChart';
  id?: Maybe<Scalars['Int']>;
  x?: Maybe<Scalars['String']>;
  y?: Maybe<Scalars['Int']>;
};

export type LineChartAggregate = {
  __typename?: 'LineChartAggregate';
  _id?: Maybe<Scalars['String']>;
  data?: Maybe<Array<LineChart>>;
};

export type LineCsvAggregate = {
  __typename?: 'LineCsvAggregate';
  _id?: Maybe<Scalars['Int']>;
  bulan?: Maybe<Scalars['String']>;
  ditolak?: Maybe<Scalars['Int']>;
  selesai?: Maybe<Scalars['Int']>;
};

export type LineStatus = {
  __typename?: 'LineStatus';
  bulan: Scalars['String'];
  id_bulan?: Maybe<Scalars['Int']>;
  id_tahun?: Maybe<Scalars['Int']>;
  jumlah_izin: Scalars['Int'];
  status: Scalars['String'];
  tahun: Scalars['Int'];
};

export type LinksPagination = {
  __typename?: 'LinksPagination';
  first?: Maybe<ParamsPagination>;
  last?: Maybe<ParamsPagination>;
  next?: Maybe<ParamsPagination>;
  prev?: Maybe<ParamsPagination>;
};

export type LoginInput = {
  email?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
};

export type MetaPagination = {
  __typename?: 'MetaPagination';
  currentPage: Scalars['Int'];
  itemCount: Scalars['Int'];
  itemsPerPage: Scalars['Int'];
  totalItems: Scalars['Int'];
  totalPages: Scalars['Int'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createAuth: Users;
  login?: Maybe<Users>;
  removeAuth: Users;
  updateAuth: Users;
};


export type MutationCreateAuthArgs = {
  createAuthInput: CreateUsersInput;
};


export type MutationLoginArgs = {
  params: LoginInput;
};


export type MutationRemoveAuthArgs = {
  id: Scalars['Int'];
};


export type MutationUpdateAuthArgs = {
  updateAuthInput: UpdateAuthInput;
};

export type ParamsPagination = {
  __typename?: 'ParamsPagination';
  limit: Scalars['Int'];
  page: Scalars['Int'];
};

export type PieStatus = {
  __typename?: 'PieStatus';
  id_tahun?: Maybe<Scalars['Int']>;
  jumlah_izin: Scalars['Int'];
  status_grup: Scalars['String'];
  tahun: Scalars['Int'];
};

export type PieStatusOrigin = {
  __typename?: 'PieStatusOrigin';
  id: Scalars['Int'];
  id_tahun: Scalars['Int'];
  jumlah_izin: Scalars['Int'];
  status_grup: Scalars['String'];
  tahun: Scalars['Int'];
};

export type Query = {
  __typename?: 'Query';
  barTable: Array<BarTable>;
  barTableChartAggregat: Array<StatusGroupAggregate>;
  barTableOrigin: Array<BarTable>;
  bidang: Array<BidangSum>;
  bidangChartAggregate: Array<SumAggregate>;
  bidangOrigin: Array<BidangSum>;
  filterStatus: Array<FilterStatus>;
  filterTahun: Array<FilterTahun>;
  getDashboards: Dashboards;
  getFiltersDashboard: FiltersDashboard;
  getUsers: Array<Users>;
  lineStatus: Array<LineStatus>;
  lineStatusChartAggregate: Array<LineChartAggregate>;
  lineStatusCsvAggregate: Array<LineCsvAggregate>;
  lineStatusOrigin: Array<LineStatus>;
  pieStatus: Array<PieStatus>;
  pieStatusChartAggregat: Array<SumAggregate>;
  pieStatusOrigin: Array<PieStatusOrigin>;
  reportDataTable: ReportTablePagination;
  reportTable: ReportTable;
  syncTest: Scalars['String'];
  totalIzin: Array<TotalIzin>;
  totalIzinChartAggregate: Array<SumAggregate>;
  totalIzinOrigin: Array<TotalIzin>;
};


export type QueryBarTableArgs = {
  status?: InputMaybe<Scalars['String']>;
  tahun?: InputMaybe<Array<Scalars['Int']>>;
};


export type QueryBarTableChartAggregatArgs = {
  status?: InputMaybe<Scalars['String']>;
  tahun?: InputMaybe<Array<Scalars['Int']>>;
};


export type QueryBidangArgs = {
  status?: InputMaybe<Scalars['String']>;
  tahun?: InputMaybe<Array<Scalars['Int']>>;
};


export type QueryBidangChartAggregateArgs = {
  status?: InputMaybe<Scalars['String']>;
  tahun?: InputMaybe<Array<Scalars['Int']>>;
};


export type QueryGetDashboardsArgs = {
  status?: InputMaybe<Scalars['String']>;
  tahun?: InputMaybe<Array<Scalars['Int']>>;
};


export type QueryLineStatusArgs = {
  tahun?: InputMaybe<Array<Scalars['Int']>>;
};


export type QueryLineStatusChartAggregateArgs = {
  tahun?: InputMaybe<Array<Scalars['Int']>>;
};


export type QueryLineStatusCsvAggregateArgs = {
  tahun?: InputMaybe<Array<Scalars['Int']>>;
};


export type QueryPieStatusArgs = {
  tahun?: InputMaybe<Array<Scalars['Int']>>;
};


export type QueryPieStatusChartAggregatArgs = {
  tahun?: InputMaybe<Array<Scalars['Int']>>;
};


export type QueryReportDataTableArgs = {
  bidang?: InputMaybe<Scalars['String']>;
  kategori?: InputMaybe<Scalars['String']>;
  level_wilayah?: InputMaybe<Scalars['String']>;
  limit?: InputMaybe<Scalars['Int']>;
  nama_izin?: InputMaybe<Scalars['String']>;
  nama_pemohon?: InputMaybe<Scalars['String']>;
  nama_perusahaan?: InputMaybe<Scalars['String']>;
  nama_usaha?: InputMaybe<Scalars['String']>;
  no_identitas_pemohon?: InputMaybe<Scalars['String']>;
  nomor_permohonan?: InputMaybe<Scalars['String']>;
  nomor_sk?: InputMaybe<Scalars['String']>;
  npwp_perusahaan?: InputMaybe<Scalars['String']>;
  page?: InputMaybe<Scalars['Int']>;
  service_point?: InputMaybe<Scalars['String']>;
  source_db?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<Scalars['String']>;
  tahun?: InputMaybe<Scalars['String']>;
};


export type QueryReportTableArgs = {
  id: Scalars['Int'];
};


export type QueryTotalIzinArgs = {
  tahun?: InputMaybe<Array<Scalars['Int']>>;
};


export type QueryTotalIzinChartAggregateArgs = {
  tahun?: InputMaybe<Array<Scalars['Int']>>;
};

export type ReportTable = {
  __typename?: 'ReportTable';
  alamat_izin: Scalars['String'];
  alamat_pemohon: Scalars['String'];
  alamat_perusahaan: Scalars['String'];
  bidang: Scalars['String'];
  bulan: Scalars['String'];
  data_teknis?: Maybe<Scalars['JSON']>;
  id: Scalars['Int'];
  kategori: Scalars['String'];
  kode_wilayah_izin: Scalars['String'];
  koordinat_izin: Scalars['String'];
  level_wilayah: Scalars['String'];
  nama_izin: Scalars['String'];
  nama_pemohon: Scalars['String'];
  nama_perusahaan: Scalars['String'];
  nama_usaha: Scalars['String'];
  no_identitas_pemohon: Scalars['String'];
  nomor_permohonan: Scalars['String'];
  nomor_sk: Scalars['String'];
  npwp_perusahaan: Scalars['String'];
  service_point: Scalars['String'];
  source_db: Scalars['String'];
  status: Scalars['String'];
  tahun: Scalars['String'];
  tgl_akhir_berlaku?: Maybe<Scalars['String']>;
  tgl_pengajuan?: Maybe<Scalars['Timestamp']>;
  tgl_terbit_izin?: Maybe<Scalars['String']>;
  tipe_pengajuan: Scalars['String'];
  tipe_perizinan: Scalars['String'];
  zonasi: Scalars['String'];
};

export type ReportTablePagination = {
  __typename?: 'ReportTablePagination';
  items: Array<ReportTable>;
  links: LinksPagination;
  meta: MetaPagination;
};

export enum Roles {
  Admin = 'Admin',
  Backoffice = 'Backoffice',
  Integrator = 'Integrator'
}

export type StatusGroupAggregate = {
  __typename?: 'StatusGroupAggregate';
  _id?: Maybe<Scalars['String']>;
  ditolak?: Maybe<Scalars['Int']>;
  kode?: Maybe<Scalars['String']>;
  selesai?: Maybe<Scalars['Int']>;
};

export type SumAggregate = {
  __typename?: 'SumAggregate';
  _id?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['Int']>;
};

export type TotalIzin = {
  __typename?: 'TotalIzin';
  id_tahun?: Maybe<Scalars['Int']>;
  jumlah_izin?: Maybe<Scalars['Int']>;
  tahun?: Maybe<Scalars['Int']>;
};

export type UpdateAuthInput = {
  /** Example field (placeholder) */
  exampleField?: InputMaybe<Scalars['Int']>;
  id: Scalars['Int'];
};

export type Users = {
  __typename?: 'Users';
  access_token: Scalars['String'];
  createdAt: Scalars['DateTime'];
  email: Scalars['String'];
  name: Scalars['String'];
  roles?: Maybe<Array<Roles>>;
  updatedAt: Scalars['DateTime'];
  wilayah: Scalars['String'];
};

export type GetDashboardsQueryVariables = Exact<{
  tahun?: InputMaybe<Array<Scalars['Int']> | Scalars['Int']>;
  status?: InputMaybe<Scalars['String']>;
}>;


export type GetDashboardsQuery = { __typename?: 'Query', getDashboards: { __typename?: 'Dashboards', tahun: Array<number>, status: string, pieStatusAggregate: Array<{ __typename?: 'SumAggregate', value?: number | null, label?: string | null }>, totalIzinAggregate: { __typename?: 'SumAggregate', value?: number | null }, bidangSumAggregate: Array<{ __typename?: 'SumAggregate', value?: number | null, label?: string | null }>, barTableAggregate: Array<{ __typename?: 'StatusGroupAggregate', selesai?: number | null, ditolak?: number | null, kode?: string | null, label?: string | null }>, lineStatusAggregate: Array<{ __typename?: 'LineChartAggregate', id?: string | null, data?: Array<{ __typename?: 'LineChart', x?: string | null, y?: number | null }> | null }>, lineStatusCsv: Array<{ __typename?: 'LineCsvAggregate', bulan?: string | null, ditolak?: number | null, selesai?: number | null }> } };

export type LineStatusCsvAggregateQueryVariables = Exact<{
  tahun?: InputMaybe<Array<Scalars['Int']> | Scalars['Int']>;
}>;


export type LineStatusCsvAggregateQuery = { __typename?: 'Query', lineStatusCsvAggregate: Array<{ __typename?: 'LineCsvAggregate', ditolak?: number | null, selesai?: number | null, bulan?: number | null }> };


export const GetDashboardsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getDashboards"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"tahun"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"status"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getDashboards"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"tahun"},"value":{"kind":"Variable","name":{"kind":"Name","value":"tahun"}}},{"kind":"Argument","name":{"kind":"Name","value":"status"},"value":{"kind":"Variable","name":{"kind":"Name","value":"status"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tahun"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"pieStatusAggregate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"label"},"name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"totalIzinAggregate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"bidangSumAggregate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"label"},"name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"barTableAggregate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"kode"},"name":{"kind":"Name","value":"kode"}},{"kind":"Field","alias":{"kind":"Name","value":"label"},"name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"selesai"}},{"kind":"Field","name":{"kind":"Name","value":"ditolak"}}]}},{"kind":"Field","name":{"kind":"Name","value":"lineStatusAggregate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"id"},"name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"x"}},{"kind":"Field","name":{"kind":"Name","value":"y"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"lineStatusCsv"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"bulan"}},{"kind":"Field","name":{"kind":"Name","value":"ditolak"}},{"kind":"Field","name":{"kind":"Name","value":"selesai"}}]}}]}}]}}]} as unknown as DocumentNode<GetDashboardsQuery, GetDashboardsQueryVariables>;
export const LineStatusCsvAggregateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"lineStatusCsvAggregate"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"tahun"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"lineStatusCsvAggregate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"tahun"},"value":{"kind":"Variable","name":{"kind":"Name","value":"tahun"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"bulan"},"name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"ditolak"}},{"kind":"Field","name":{"kind":"Name","value":"selesai"}}]}}]}}]} as unknown as DocumentNode<LineStatusCsvAggregateQuery, LineStatusCsvAggregateQueryVariables>;