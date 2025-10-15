import { CodePane } from "spectacle";

export const Code = () => (
  <CodePane language="javascript">
    {`
const formApi = createForm({ onSubmit: noop });
const GlobalContext = createContext(formApi);

const Form = () => {
  const formApi = useContext(GlobalContext);
  return (
    <FinalForm>
        {/* definition of fields ommited for brewity */}
        <FormSpy subscription={{ values: true }}>
            {({ values }) => {
                formApi.initialize(values);
            }}
        </FormSpy>
    </FinalForm>
  );
};

export const PortalApp = () => {
  return (
    <GlobalContext.Provider value={formApi}>
      <Form />
    </GlobalContext.Provider>
  );
};
`}
  </CodePane>
);
