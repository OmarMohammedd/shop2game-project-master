'use client'
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useSelector } from 'react-redux'
import { useRouter } from 'next/navigation';
import { useState } from 'react';
const Topupamountcard = () => {
    const game = useSelector((state) => state.game.value)
    const user = useSelector((state) => state.user.user);
    const [code, setCode] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState({ appearance: false, message: '' })
    const router = useRouter()

    async function handleSubmit(e) {
        e.preventDefault();

        if (!user.loggedIn) {
            setError({ appearance: true, message: 'Please Login First' });
            return;
        }

        setLoading(true);

        try {
            const response = await fetch(`/api/get-code?code=${code}&game=${user.game}&uid=${user.uid}`, {
                headers: {
                    'Accept': 'application/json',
                    // No need for 'Content-Type' for GET requests
                },
                method: "GET",
            });

            const responseData = await response.json();
            console.log(responseData);

            if (!responseData.success) {
                return setError({ appearance: true, message: responseData.message });
            } else {
                let usersArray = JSON.parse(localStorage.getItem('usersArray')) || [];
                usersArray.push(user);
                localStorage.setItem('usersArray', JSON.stringify(usersArray));
                router.push(`/success/${code}`);
            }
        } catch (error) {
            setError({ appearance: true, message: error.message });
        } finally {
            setLoading(false);
        }
    }

    const freefiredata = [
        { name: 'US$ 1', heading: 'Diamond 100', bonus: '+ مكافأة عام 10' },
        { name: 'US$ 2', heading: 'Diamond 210', bonus: '+ مكافأة عام  21   ' },
        { name: 'US$ 5', heading: 'Diamond 530', bonus: '+ مكافأة عام 53' },
        { name: 'US$ 10', heading: 'Diamond 1,080', bonus: '+ مكافأة عام 108' },
        { name: 'US$ 20', heading: 'Diamond 2,200', bonus: '+ مكافأة عام 220' },
    ]
    const blackcloverdata = [
        { name: '50', heading: 'Black Crystals 43' },
        { name: '100', heading: 'Black Crystals 88' },
        { name: '250', heading: ' Black Crystals 225' },
        { name: '500', heading: 'Black Crystals 470' },
        { name: '1000', heading: 'Black Crystals  980' },
    ]
    return (
        <div className='w-fit mt-8 max-[1100px]:w-full'>
            <div className=' flex items-center
                justify-end gap-2'>
                <p className=' text-xl font-bold font-ar '>كمية الشحن</p>
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
      2
    </div>
  </div>
  <span className="font-bold" />
</div>
            </div>
            <div className=' w-[1000px] max-[760px]:items-start h-[450px] flex border border-[#eeeeee] mt-5 max-[1100px]:w-full max-[760px]:flex-col max-[760px]:h-fit
            
            
            '>
                <div className=' h-full w-[50%] flex flex-col   items-center justify-between py-8 px-10 max-[760px]:w-full max-[760px]:gap-5 '>
                    {game === 'freefire' &&
                        freefiredata?.map((offer) => {
                            return (
                                <Offers name={offer.name} bonus={offer.bonus} heading={offer.heading} />
                            )
                        })
                    }

                    {game === 'blackclover' &&
                        blackcloverdata?.map((offer) => {
                            return (
                                <BCOffers name={offer.name} heading={offer.heading} />
                            )
                        })
                    }

                </div>
                <div className=' h-full w-[50%]  py-8 px-10 flex items-end justify-start flex-col max-[760px]:w-full '>
                    <Image src='/assets/icon_ppc.png' alt='icon' height={30} width={30} />

                    <p className=' text-sm text-right
                     font-medium text-[#757575] font-ar '>يمكنك استبدال رمز قسيمة جارينا من هنا. يمكن شراء قسيمة جارينا من خلال موزعينا الرسمين
                    </p>
                    <span className=' '>
                        <Link target='_blank' href='https://menadistributors.ff.garena.com/ar'>
                            <p className=' font-ar  text-sm underline text-[#2E86C1]  '> (أضغط هنا للاطلاع على قائمة الموزعين)</p>
                        </Link>

                    </span>

                    <div className=' w-full'>
                        <p className=' text-md mr-1  font-normal text-[#28292f] text-right mt-8 font-ar '>كلمة المرور لبطاقة جارينا المدفوعة مسبقاً</p>
                        <form onSubmit={handleSubmit}>
                            <Input value={code} onChange={(e) => setCode(e.target.value)} className='mt-3 text-right font-ar ' placeholder='كلمة مرور بطاقة جارينا المدفوعة مسبقاً' />
                            {error.appearance && <p className=' text-sm font-light mt-1 text-red-600  text-right'>{error.message}</p>}
                            <Button disabled={code.length !== 10 | loading} variant='custom' className=' font-bold rounded-md mt-5 h-10 text-lg text-white w-full'>

                                {loading ? ' ... تأكيد' : ' تأكيد'}
                            </Button>
                        </form>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default Topupamountcard;



const Offers = ({ name, heading, bonus }) => {
    return (
        <div className=' w-full flex items-center justify-between'>
            <p className=' text-sm font-[500] font-en'>{name}</p>
            <div className=' flex items-center justify-center gap-2'>
                <div className=' flex  items-center justify-end flex-col'>
                    <p className=' text-lg font-medium  font-en'>{heading}</p>
                    <p className=' text-sm font-medium text-[#ff8f00]'>{bonus}</p>
                </div>
                <Image src='/assets/diamond.png' height={30} width={30} alt='diamond' />
            </div>
        </div>
    );
}

const BCOffers = ({ name, heading }) => {
    return (
        <div className=' w-full flex items-center justify-between'>
            <div className='flex items-center justify-center gap-1'>
                <p className=' text-sm font-[500] font-en'>{name}</p>
                <Image src='/assets/bc-shells.svg' height={20} width={20} alt='aa' />
            </div>
            <div className=' flex items-center justify-center gap-2'>

                <p className=' text-lg font-medium  font-en'>{heading}</p>


                <Image src='/assets/bc-elixer.png' height={30} width={30} alt='diamond' />
            </div>
        </div>
    );
}


