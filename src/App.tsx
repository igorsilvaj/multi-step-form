import GlobalStyle from './styles/GlobalStyle';
import MultiStepForm from './components/MultiStepForm';
import UserInfoProvider from './contexts/UserInfoContext';
import { Main } from './styles/Components';

function App() {
  return (
    <Main>
      <GlobalStyle />
      <UserInfoProvider>
        <MultiStepForm />
      </UserInfoProvider>
    </Main>
  );
}

export default App;
