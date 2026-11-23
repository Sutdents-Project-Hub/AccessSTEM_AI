import { LearningWorkspace } from "@/components/learning-workspace";

export default async function Home({ searchParams }: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { lang } = await searchParams;
  const initialLanguage = lang === "zh-Hant" ? "zh-Hant" : "en";

  return <LearningWorkspace initialLanguage={initialLanguage} />;
}
