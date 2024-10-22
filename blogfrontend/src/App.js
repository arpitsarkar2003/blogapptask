import { Button } from "./components/ui/Button";
import { Input } from "./components/ui/Input";

function App() {
  return (
    <div className="App">
      <h1 className="text-3xl font-bold underline">Hello</h1>
      <Button variant="outline" size="lg" >Button</Button>
      <Input
                type="search"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 rounded-full bg-gray-100"
              />
    </div>
  );
}

export default App;
