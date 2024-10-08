// pages/[id].js
export async function getServerSideProps({ params }) {
  const code = await fetchCodeFromDB(params.id); // Fetch code from database
  return { props: { code } };
}

const CodeSnippet = ({ code }) => {
  return <CodeEditor initialCode={code} />;
};

export default CodeSnippet;
