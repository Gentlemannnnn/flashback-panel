import React from 'react';
import type { NextPage } from 'next';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import Logs from 'modules/logs';

const Dashboard: NextPage = () => <Logs />;

export default Dashboard;

export const getServerSideProps = withPageAuthRequired();
