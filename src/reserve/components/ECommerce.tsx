import CardFour from './CardFour.tsx';
import CardOne from './CardOne.tsx';
import CardThree from './CardThree.tsx';
import CardTwo from './CardTwo.tsx';
import ChartOne from './ChartOne.tsx';
import ChartThree from './ChartThree.tsx';
import ChartTwo from './ChartTwo.tsx';
import ChatCard from './ChatCard.tsx';

import TableOne from './TableOne.tsx';
import MapOne from './MapOne.tsx';

const ECommerce = () => {
  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        <CardOne />
        <CardTwo />
        <CardThree />
        <CardFour />
      </div>

      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <ChartOne />
        <ChartTwo />
        <ChartThree />
        <MapOne />
        <div className="col-span-12 xl:col-span-8">
          <TableOne />
        </div>
        <ChatCard />
      </div>
    </>
  );
};

export default ECommerce;
