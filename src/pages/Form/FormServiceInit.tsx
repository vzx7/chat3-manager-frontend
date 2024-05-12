import Breadcrumb from '../../components/Breadcrumb';
import CheckboxTwo from '../../components/CheckboxTwo';

const FormServiceInit = () => {
  return (
    <>
      <Breadcrumb pageName="Создание сервиса" />

      <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
        <div className="flex flex-col gap-9">
          {/* <!-- Данные сервиса --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Данные сервиса
              </h3>
            </div>
            <form action="#">
              <div className="p-6.5">
                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full ">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Domain <span className="text-meta-1">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Enter service domain"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />
                  </div>


                </div>

                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Enable SSL <span className="text-meta-1">*</span>
                  </label>
                  <CheckboxTwo text="Использовать SSL для этого домена" />
                </div>

                <button className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray">
                  Разместить домен
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default FormServiceInit;
