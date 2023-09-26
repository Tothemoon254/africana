import { Spinner } from "@chakra-ui/react";

const Loading = () => {
  return (
    <div
      className="w-[100%] h-[100vh] flex flex-col justify-center items-center bg-[#FD8D14]"
    >
      <Spinner />
    </div>
  );
};

export default Loading;