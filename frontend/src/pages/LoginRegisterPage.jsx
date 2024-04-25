import React from 'react'
import { Outlet } from 'react-router-dom';
import Lottie from 'react-lottie';
import animationData from "../../public/lotties/Animation - 1713635685590.json"

const LoginRegisterPage = () => {
  return (
      <div className='flex justify-around items-center pt-[10vh]'>
          <div>
              <Lottie
                  options={{
                      loop: true,
                      autoplay: true,
                      animationData: animationData,
                  }}
                  height={400}
                  width={400}
              />
          </div>
          <div>
              <Outlet />
          </div>
      </div>
  );
}

export default LoginRegisterPage
