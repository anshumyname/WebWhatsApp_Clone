
import Messenger from './components/Messenger';
import './App.css';
import AccountProvider from './components/context/AccountProvider';
import TemplateProvider from './theme/TemplateProvider';
import UserProvider from './components/context/UserProvier';

function App() {
  return (
    <div className="App">
      <TemplateProvider>
        <UserProvider>
          <AccountProvider>
            <Messenger />
          </AccountProvider>
        </UserProvider>
      </TemplateProvider>
    </div>
  );
}

export default App;
