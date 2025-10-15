import { CodePane } from "spectacle";

export const App = () => (
  <CodePane language="javascript">
    {`
// pages/_app.js

import { Form } from 'react-final-form';
import Layout from '../components/Layout';

function MyApp({ Component, pageProps }) {
  return (
    <Form {...formConfig}>
      {({ form }) => (
        <Layout>
          {/* Pass form prop to the page component */}
          <Component {...pageProps} form={form} />
        </Layout>
      )}
    </Form>
  );
}
        `}
  </CodePane>
);


export const Page = () => (
  <CodePane language="javascript">
    {`
// pages/page.js
import { Field } from 'react-final-form';

export default function Page({ form }) {
  return (
    <form onSubmit={form.handleSubmit}>
      <div>
        <label>First Name</label>
        <Field name="firstName" />
      </div>
      <div>
        <label>Last Name</label>
        <Field name="lastName" />
      </div>
    </form>
  );
}}
        `}
  </CodePane>
);
