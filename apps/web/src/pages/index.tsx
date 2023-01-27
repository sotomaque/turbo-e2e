import { Button } from 'ui';

export default function Web() {
  return (
    <div className="border-4 border-red-500 h-screen">
      <Button label={'Boop'} />

      <div className="h-8 w-8 border-2 border-green-400 rounded-sm"></div>
    </div>
  );
}
