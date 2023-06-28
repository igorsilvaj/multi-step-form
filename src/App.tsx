import MultiStepForm from './components/MultiStepForm';
import UserInfoProvider from './contexts/UserInfoContext';

function App() {
  return (
    <main>
      <UserInfoProvider>
        <MultiStepForm />
      </UserInfoProvider>
    </main>
  );
}

export default App;
