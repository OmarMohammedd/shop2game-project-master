'use client'
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Input } from '../ui/input';
import { Cross2Icon } from '@radix-ui/react-icons';
import { Button } from '../ui/button';
import { ChevronDownIcon, ExitIcon } from '@radix-ui/react-icons';
import { Login, Logout } from '@/redux/slices/userslice';
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarSeparator, MenubarTrigger } from "@/components/ui/menubar";
import Image from 'next/image';


const Playerlogincard = () => {

  const [errorMessage, setErrorMessage] = useState('');
  const [showError, setShowError] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();
    setErrorMessage('An error occurred. Please try again later');
    setShowError(true);
    setTimeout(() => {
      setShowError(false);
    }, 3000); 
  };;

    const game = useSelector((state) => state.game.value);
    const user = useSelector((state) => state.user.user);
    const dispatch = useDispatch();
    const [uid, setUid] = useState('');
    const [loading, setLoading] = useState(false);
    const [prevPlayers, setPrevPlayers] = useState([]);
    const [error, setError] = useState({ appearance: false, message: '' });

    useEffect(() => {
        const storedPlayers = localStorage.getItem('usersArray');
        if (storedPlayers) {
            setPrevPlayers(JSON.parse(storedPlayers));
        }
    }, []);

    const handlePlayerLogin = async () => {
        setUid('');
        setError({ appearance: false, message: '' });
        if (!uid) {
            return setError({ appearance: true, message: 'Enter Player Uid' });
        }
        setLoading(true);
        try {
            const response = await fetch(`/api/get-user/?uid=${uid}&game=${game}`, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "GET",
            });
            const responseData = await response.json();
            if (!responseData.success) {
                setError({ appearance: true, message: responseData.message });
            } else {
                dispatch(Login({ uid: responseData.message.uid, name: responseData.message.name, game: responseData.message.game }));
            }
        } catch (error) {
            setError({ appearance: true, message: error.message });
        } finally {
            setLoading(false);
        }
    };

    const deletePlayerFromList = (uidToDelete) => {
        let usersArray = JSON.parse(localStorage.getItem('usersArray')) || [];
        usersArray = usersArray.filter(user => user.uid !== uidToDelete);
        localStorage.setItem('usersArray', JSON.stringify(usersArray));
        setPrevPlayers(prev => prev.filter(player => player.uid !== uidToDelete));
    };

    return (
        <div className='w-fit mt-10 max-[736px]:w-full'>
            <div className='flex items-center justify-end gap-2 max-[736px]:w-full'>
                {user?.loggedIn && <div className={`flex items-end max-[736px]:w-full justify-center gap-28 hover:cursor-pointer ${user ? 'max-[736px]:justify-between' : 'max-[736px]:items-start'}`}>
                    <div onClick={() => dispatch(Logout())} className='flex items-center justify-center gap-2'>
                        <p className='text-sm font-normal text-[#d81a0d] font-ar '>تسجيل الخروج</p>
                        <ExitIcon className='text text-[#d81a0d]' />
                    </div>
                    <p className='text-xl font-bold font-ar '>تسجيل الدخول</p>
                </div>}
                {!user.loggedIn && <div className={`flex items-end justify-center gap-28 hover:cursor-pointer ${user ? 'max-[736px]:justify-between' : 'max-[736px]:items-start'}`}>

                    <p className='text-xl font-bold font-ar '>تسجيل الدخول</p>
                </div>

                }
                

<div className=" flex items-center gap-2 text-lg/none text-text-title md:text-xl/none">
  <div className="grid items-center" data-marker="true">
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="col-start-1 row-start-1 text-2xl text-primary-red"
    >
      <path
        d="M0 3C0 1.34315 1.34315 0 3 0H21C22.6569 0 24 1.34315 24 3V15.7574C24 16.553 23.6839 17.3161 23.1213 17.8787L17.8787 23.1213C17.3161 23.6839 16.553 24 15.7574 24H3C1.34315 24 0 22.6569 0 21V3Z"
        fill="currentColor"
      />
    </svg>
    <div className="col-start-1 row-start-1 text-center text-base/none font-bold text-white">
      1
    </div>
  </div>
  <span className="font-bold" />
</div>

                
            </div>
            {!user?.loggedIn ? (
<div className='w-fit max-[736px]:w-full h-fit bg-[#eee] rounded-lg mt-5 gap-5 border-[#e5e7eb] border flex flex-col items-end py-4 pb-6 px-8 justify-center'>
<div className='flex flex-col items-end justify-center gap-2 max-[736px]:w-full'>
<p className='mr-1 text-sm font-ar  font-medium'>معرّف الاعب</p>
<div className='w-full flex max-[736px]:w-full'>
    <Button disabled={loading} onClick={handlePlayerLogin} variant='custom' size='custom'>
        {loading ? '... تسجيل الدخول' : 'تسجيل الدخول'}
    </Button>
    <div className='relative max-[736px]:w-full'>
        <Input
            dir="rtl"
            value={uid}
            onChange={(e) => setUid(e.target.value)}
            className=' font-ar relative w-[400px] max-[736px]:w-full pl-12 rounded-tl-none rounded-bl-none  bg-white'
            placeholder='يرجى إدخال معرف اللاعب هنا'
        />
        {error.appearance && <p className='text-sm font-light mt-1 text-red-600 text-right'>{error.message}</p>}
        <Menubar>
            <MenubarMenu>
                <MenubarTrigger>
                    {prevPlayers.length !== 0 && (
                        <div className='h-full w-full'>
                            <ChevronDownIcon className='mr-2 text-black h-5 w-5 absolute top-4 hover:cursor-pointer' />
                        </div>
                    )}
                </MenubarTrigger>
                <MenubarContent>
                    {prevPlayers?.map((player) => (
                        <React.Fragment key={player.uid}>
                            <MenubarItem >
                                <Image className=' hover:cursor-pointer' onClick={() => setUid(player.uid)} src='/assets/replace.svg' height={15} width={15} alt='aa' />
                                <PreviousPlayers
                                    game={player.game}
                                    name={player.name}
                                    id={player.uid}
                                    onDelete={deletePlayerFromList}
                                />
                            </MenubarItem>
                            <MenubarSeparator />
                        </React.Fragment>
                    ))}
                </MenubarContent>
            </MenubarMenu>
        </Menubar>
    </div>
</div>
<div style={{width:"100%"}} dir="rtl" className="relative flex flex-col items-center gap-4 text-xs/normal text-text-secondary md:text-sm/[22px]">
      <div className="flex items-center justify-between w-full mb-4">
        <span className="flex-1">أو سجل دخولك بحساب اللعبة الخاص بك</span>
        <div className="flex gap-4">
          <a
            className="shrink-0 rounded-full p-1.5 transition-opacity hover:opacity-70 bg-[#006AFC]"
            href="https://authgop.garena.com/universal/oauth?client_id=10017&redirect_uri=https%3A%2F%2Fshop2game.com%2F%3Fapp%3D100067&response_type=token&platform=3&locale=en-US&theme=light"
            onClick={handleClick}
          >
            <img
              className="h-5 w-5 brightness-0 invert"
              src="https://cdn-gop.garenanow.com/gop/mshop/www/live/assets/ic-fb-485c92b0.svg"
              alt="Facebook logo"
            />
          </a>
          <a
            className="shrink-0 rounded-full p-1.5 transition-opacity hover:opacity-70 outline outline-1 -outline-offset-1 outline-line bg-white"
            href="https://authgop.garena.com/universal/oauth?client_id=10017&redirect_uri=https%3A%2F%2Fshop2game.com%2F%3Fapp%3D100067&response_type=token&platform=8&locale=en-US&theme=light"
            onClick={handleClick}
          >
            <img
              className="h-5 w-5"
              src="https://cdn-gop.garenanow.com/gop/mshop/www/live/assets/ic-google-d2ceaa95.svg"
              alt="Google logo"
            />
          </a>
          <a
            className="shrink-0 rounded-full p-1.5 transition-opacity hover:opacity-70 outline outline-1 -outline-offset-1 outline-line bg-white"
            href="https://authgop.garena.com/universal/oauth?client_id=10017&redirect_uri=https%3A%2F%2Fshop2game.com%2F%3Fapp%3D100067&response_type=token&platform=11&locale=en-US&theme=light"
            onClick={handleClick}
          >
            <img
              className="h-5 w-5"
              src="https://cdn-gop.garenanow.com/gop/mshop/www/live/assets/ic-twitter-92527e61.svg"
              alt="Twitter logo"
            />
          </a>
          <a
            className="shrink-0 rounded-full p-1.5 transition-opacity hover:opacity-70 bg-[#0077FF]"
            href="https://authgop.garena.com/universal/oauth?client_id=10017&redirect_uri=https%3A%2F%2Fshop2game.com%2F%3Fapp%3D100067&response_type=token&platform=5&locale=en-US&theme=light"
            onClick={handleClick}
          >
            <img
              className="h-5 w-5 brightness-0 invert"
              src="https://cdn-gop.garenanow.com/gop/mshop/www/live/assets/ic-vk-abadf989.svg"
              alt="VK logo"
            />
          </a>
        </div>
      </div>
      {errorMessage && showError && (
        <div className="absolute bottom-0 left-0 w-full text-red-500 transition-opacity duration-500 opacity-100">
          {errorMessage}
        </div>
      )}
    </div>

                    </div>
                </div>
            ) : (
                <div className='w-fit max-[736px]:w-full h-fit bg-[#eee] rounded-lg mt-5 gap-5 border-[#e5e7eb] border flex flex-col items-end py-4 pb-6 px-8 justify-center'>
                    <div className='hover:cursor-pointer w-full flex items-center gap-20 justify-between px-2 py-2'>
                        <div className='flex flex-col gap-2'>
                            <div className='flex gap-1'>
                                <p>{user?.name}</p>
                                <p className='font-semibold font-ar '>: اسم المستخدم</p>
                            </div>
                            <div className='flex gap-1'>
                                <p className='text-[#888] text-sm'>{user?.uid}</p>
                                <p className='text-[#888] text-sm font-ar '>: معرّف الاعب</p>
                            </div>
                        </div>
                        {user.game === 'freefire' ? (
                            <Image src='/assets/freefire-selector.png' width={50} height={50} alt='image' className='rounded-full' />
                        ) : (
                            <Image src='/assets/blackclover-selector.png' width={50} height={50} alt='image' className='rounded-full' />
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Playerlogincard;



const PreviousPlayers = ({ name, id, game, onDelete }) => {

    const handleDelete = () => {
        onDelete(id);
    };

    return (
        <div className='hover:cursor-pointer w-full flex items-center gap-10 justify-between px-2 py-2'>
            <Cross2Icon onClick={handleDelete} />
            <div className='flex gap-2 items-center justify-center'>
                <div className='flex flex-col items-center justify-center'>
                    <div className='flex gap-1'>
                        <p>{name}</p>
                        <p className='font-semibold font-ar '>: اسم المستخدم</p>
                    </div>
                    <div className='flex gap-1'>
                        <p className='text-[#888] text-sm'>{id}</p>
                        <p className='text-[#888] text-sm font-ar '>: معرّف الاعب</p>
                    </div>
                </div>
                {game === 'freefire' ? (
                    <Image src='/assets/freefire-selector.png' alt='im' height={30} width={30} className='rounded-full' />
                ) : (
                    <Image src='/assets/blackclover-selector.png' alt='im' height={30} width={30} className='rounded-full' />
                )}
            </div>
        </div>
    );
};


