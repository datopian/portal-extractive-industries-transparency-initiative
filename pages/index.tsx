import type { InferGetServerSidePropsType } from "next";
import Head from "next/head";
import Hero from "../components/home/heroSection/Hero";
import { StatsProps } from "../components/home/heroSection/Stats";
import MainSection from "../components/home/mainSection/MainSection";
import Layout from "../components/_shared/Layout";
import { searchDatasets } from "@/lib/queries/dataset";
import { getAllGroups } from "@/lib/queries/groups";
import { getAllOrganizations } from "@/lib/queries/orgs";

export async function getStaticProps() {
  const datasets = await searchDatasets({
    offset: 0,
    limit: 5,
    tags: [],
    groups: [],
    orgs: [],
  });
  const groups = await getAllGroups({ detailed: true });
  const orgs = await getAllOrganizations({ detailed: true });
  const stats: StatsProps = {
    datasetCount: datasets.count,
    groupCount: groups.length,
    orgCount: orgs.length,
  };
  return {
    props: {
      datasets: datasets.datasets,
      groups,
      orgs,
      stats,
    },
    revalidate: 1800,
  };
}

export default function Home({
  datasets,
  groups,
  orgs,
  stats,
}: InferGetServerSidePropsType<typeof getStaticProps>): JSX.Element {
  return (
    <>
      <Head>
        <title>EITI Open Data Portal</title>
        <meta name="description" content="EITI Open Data Portal" />
        <link rel="icon" href="https://totalenergies.com/sites/g/files/nytnzq121/files/styles/w_1110/public/images/2022-04/Logo_EITI.png?itok=ZtERfO-0" />
      </Head>
      <Layout>
        <Hero stats={stats} />
        <MainSection groups={groups} datasets={datasets} />
      </Layout>
    </>
  );
}
