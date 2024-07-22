'use client'
import React, { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { changeLan } from "@/redux/slices/settingsSlice";
import { useSelector, useDispatch } from 'react-redux';
import Buying from './buying';




const Topupamountcard = () => {

  const dispatch = useDispatch();
  const language = useSelector((state) => state.lan.language);

  useEffect(() => {
    const savedLanguage = localStorage.getItem('selectedLanguage');
    if (savedLanguage) {
      dispatch(changeLan(savedLanguage));
    }
  }, [dispatch]);


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
        { name: 'US$ 1', heading: 'Diamond 100', bonus: language ==='en' ? "+ Bonus 10" : '+ مكافأة عام 10' },
        { name: 'US$ 2', heading: 'Diamond 210', bonus: language ==='en' ? "+ Bonus 21" :  '+ مكافأة عام  21   ' },
        { name: 'US$ 5', heading: 'Diamond 530', bonus: language ==='en' ? "+ Bonus 53" :  '+ مكافأة عام 53' },
        { name: 'US$ 10', heading: 'Diamond 1,080', bonus: language ==='en' ? "+ Bonus 10" :  '+ مكافأة عام 108' },
        { name: 'US$ 20', heading: 'Diamond 2,200', bonus: language ==='en' ? "+ Bonus 220" :  '+ مكافأة عام 220' },
    ]
    const blackcloverdata = [
        { name: '50', heading: 'Black Crystals 43' },
        { name: '100', heading: 'Black Crystals 88' },
        { name: '250', heading: ' Black Crystals 225' },
        { name: '500', heading: 'Black Crystals 470' },
        { name: '1000', heading: 'Black Crystals  980' },
    ]

    const [toggle, settoggle] = useState(true);


    const [selectedCard, setSelectedCard] = useState(null);

  const cards = [
    { id: 1, value: 530 },
    { id: 2, value: 1080 },
    { id: 3, value: 2200 },
    { id: 4, value: 5600 },
  ];

  const handleCardClick = (id) => {
    setSelectedCard(id);
  };


  const [activeCard, setActiveCard] = useState(null);

  const cardss = [
    {
      id: 'r1b',
      imgSrc: 'https://cdn-gop.garenanow.com/gop/app/0000/100/067/rebate/0000/000/002/logo.png',
      altText: 'Weekly Membership',
      title: 'Weekly Membership',
    },
    {
      id: 'r1d',
      imgSrc: 'https://cdn-gop.garenanow.com/gop/app/0000/100/067/rebate/0000/081/041/logo.png',
      altText: 'Monthly Membership',
      title: 'Monthly Membership',
    },
    {
      id: 'r1f',
      imgSrc: 'https://cdn-gop.garenanow.com/gop/app/0000/100/067/rebate/0000/002/058/logo.png',
      altText: 'بطاقة رفع المستوى',
      title: language ==='en' ? "Level Up Pass" : "بطاقة رفع المستوى'",
    },
    {
      id: 'r1h',
      imgSrc: 'https://cdn-gop.garenanow.com/gop/app/0000/100/067/item/0803/000/000/logo.png',
      altText: 'تصريح بوياه',
      title: language ==='en' ? "Booyah Pass Card" : "تصريح بوياه'",
    },
  ];

  const handleCardClickk = (id) => {
    setActiveCard(id);
  };


  const [selectedId, setSelectedId] = useState(null);

  const handleCardClickkkk = (id) => {
    setSelectedId(id);
  };

  const [showMessage, setShowMessage] = useState(false);

  const handleButtonClick = () => {
    setShowMessage(true);
    setTimeout(() => {
      setShowMessage(false);
    }, 4000); 
  };

  const [selected, setSelected] = useState(null);

  const [showButton, setShowButton] = useState(false);

  const handleClick = (id) => {
    if (selected === id) {
      setSelected(null);
      setShowButton(true); 
    } else {
      setSelected(id);
      setShowButton(true); 
    }
  };
  
  const handleTabClick = (selected) => {
    settoggle(selected);
    setShowButton(false); 
  }


    return (
        <div dir={language ==='en' ? 'rtl' : 'ltr'} 
        className='w-fit mt-8 max-[1100px]:w-full' >
            <div className=' flex items-center
                justify-end gap-2'>
                <p className=' text-xl font-bold font-ar '>
                    {language ==='en' ? 'Payment Method' : 'كمية الشحن'}
                </p>
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
            

      
<div
  dir={language === 'en' ? "ltr" : "rtl"}
  className="nowarp mt-5 fgfg
    w-[1000px] max-[760px]:items-start max-[1100px]:w-full max-[760px]:flex-col max-[760px]:h-fit
    relative mb-4 flex rounded-md bg-bg-tab p-1"
  role="tablist"
  aria-orientation="horizontal"
  style={{ backgroundColor: 'rgb(244 244 244 / calc(1 * 1))' }}
>
  <button
    className={`w-1/2 rounded-sm p-2.5 text-sm/none font-medium ${
      toggle ? 'font-bold' : ''
    }`}
    id="headlessui-tabs-tab-:r10:"
    role="tab"
    type="button"
    aria-selected={toggle ? "true" : "false"}
    tabIndex={toggle ? 0 : -1}
    data-headlessui-state={toggle ? "selected" : ""}
    aria-controls="headlessui-tabs-panel-:r1j:"
    style={{
      backgroundColor: toggle ? 'rgb(255 255 255 / calc(1 * 1))' : 'rgb(244 244 244 / calc(1 * 1))',
      color: toggle ? 'rgb(216 26 13 / calc(1 * 1))' : 'inherit',
      fontWeight: toggle ? 700 : 'normal'
    }}
    onClick={() => {
      handleTabClick('tab1');
      settoggle(true);
    }}
  >
    {language === 'en' ? 'Garena Voucher' : 'قسيمة غارينا'}
  </button>
  <button
    className={`w-1/2 rounded-sm p-2.5 text-sm/none font-medium ${
      !toggle ? 'font-bold' : ''
    }`}
    id="headlessui-tabs-tab-:rv:"
    role="tab"
    type="button"
    aria-selected={!toggle ? "true" : "false"}
    tabIndex={!toggle ? 0 : -1}
    data-headlessui-state={!toggle ? "selected" : ""}
    aria-controls="headlessui-tabs-panel-:r11:"
    style={{
      backgroundColor: !toggle ? 'rgb(255 255 255 / calc(1 * 1))' : 'rgb(244 244 244 / calc(1 * 1))',
      color: !toggle ? 'rgb(216 26 13 / calc(1 * 1))' : 'inherit',
      fontWeight: !toggle ? 700 : 'normal'
    }}
    onClick={() => {
      settoggle(false);
      handleClick();
    }}
  >
    {language === 'en' ? 'Purchase' : 'شراء'}
  </button>
</div>







  {showMessage && (
        <div
          style={{
            color: "#D81A0D",
            marginTop: "10px",
            fontWeight: "500",
            marginBottom: "10px",
          }}
          dir={language ==='en' ? "ltr" : "ltr"}
        >
          {/* {language ==='en' ? "Can't proceed card payment for now. Please use another method." : 'لا يمكن إتمام عملية الدفع باستخدام البطاقة الآن. يُرجى استخدام طريقة أخرى'} */}
           Can't proceed card payment for now. Please use another method.
          
        </div>
      )}


  {toggle === true ? (
        <div className='w-[1000px] max-[760px]:items-start h-[450px] flex border border-[#eeeeee] mt-5 max-[1100px]:w-full max-[760px]:flex-col max-[760px]:h-fit'>
          <div className='h-full w-[50%] flex flex-col items-center justify-between py-8 px-10 max-[760px]:w-full max-[760px]:gap-5'>
            {game === 'freefire' &&
              freefiredata?.map((offer) => {
                return (
                  <Offers key={offer.name} name={offer.name} bonus={offer.bonus} heading={offer.heading} />
                )
              })
            }

            {game === 'blackclover' &&
              blackcloverdata?.map((offer) => {
                return (
                  <BCOffers key={offer.name} name={offer.name} heading={offer.heading} />
                )
              })
            }
          </div>
          <div className='h-full w-[50%] py-8 px-10 flex items-end justify-start flex-col max-[760px]:w-full'>
            <Image src='/assets/icon_ppc.png' alt='icon' height={30} width={30} />

            <p className={`text-sm ${language === 'en' ? 'text-left my-2' : 'text-right'} font-medium text-[#757575] font-ar`}>
              {language === 'en' ?
                'You can redeem your Garena voucher here. Garena vouchers can be purchased through our official distributors' :
                'يمكنك استبدال رمز قسيمة جارينا من هنا. يمكن شراء قسيمة جارينا من خلال موزعينا الرسمين'}
            </p>
            <span>
              <Link target='_blank' href='https://menadistributors.ff.garena.com/ar'>
                <p className='font-ar text-sm underline text-[#2E86C1]'>
                  {language === 'en' ?
                    "(Click here to view the list of distributors)" :
                    "(أضغط هنا للاطلاع على قائمة الموزعين)"}
                </p>
              </Link>
            </span>

            <div className='w-full'>
              <p className={`${language === 'en' ? 'text-left' : 'text-right'} text-md mr-1 font-normal text-[#28292f] mt-8 font-ar`} dir={language === 'en' ? 'ltr' : 'rtl'}>
                {language === 'en' ?
                  "Password for the prepaid Garena card" : "كلمة المرور لبطاقة جارينا المدفوعة مسبقاً"}
              </p>
              <form onSubmit={handleSubmit}>
                <Input
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className={`${language === 'en' ? 'text-left' : 'text-right'} mt-3 font-ar`}
                  placeholder={language === 'en' ? 'Prepaid Garena card password' : 'كلمة مرور بطاقة جارينا المدفوعة مسبقاً'}
                />
                {error.appearance && <p className='text-sm font-light mt-1 text-red-600 text-right'>{error.message}</p>}
                <Button disabled={code.length !== 10 || loading} variant='custom' className='font-bold rounded-md mt-5 h-10 text-lg text-white w-full'>
                  {loading
                    ? (language === 'en' ? "... Confirm" : "... تأكيد")
                    : (language === 'en' ? "Confirm" : "تأكيد")
                  }
                </Button>
              </form>
            </div>
          </div>
        </div>
      ) : (
        <div 
         dir= {language ==='en'? "ltr":"rtl"}
         className="flex flex-col gap-9 px-2 lg:px-0">
        <div className="flex flex-col gap-6 empty:hidden" />
        <div>
          <div>
            <div
              id="headlessui-tabs-panel-:r11:"
              role="tabpanel"
              tabIndex={-1}
              data-headlessui-state="selected"
              aria-labelledby="headlessui-tabs-tab-:rv:"
            >
              <div
                className="flex flex-col gap-4"
                id="headlessui-radiogroup-:r12:"
                role="radiogroup"
              >


<div className="flex flex-col empty:hidden" role="none">
      <div className="flex flex-col gap-4 empty:hidden" role="none">
        <div
          className="grid grid-cols-3 gap-2.5 sm:grid-cols-4 md:grid-cols-6 md:gap-4 empty:hidden"
          role="none"
        >
          {cards.map((card) => (
            <div 
            onClick={() => handleClick('c199')}
            className="relative" role="none" key={card.id}>
              <div
                className={`borrder group peer relative flex min-h-[50px] cursor-pointer flex-col items-center justify-center rounded-md outline outline-1 outline-gray-200 sm:min-h-[64px] md:min-h-[72px] ${
                  selectedCard === card.id
                    ? 'bg-[rgb(255,244,244,calc(1*1))] outline-red-700 outline-2 -outline-offset-2 '
                    : 'bg-bg-unselected outline-box-border'
                }`}
                id={`headlessui-radiogroup-option-${card.id}`}
                role="radio"
                aria-checked={selectedCard === card.id}
                tabIndex={0}
                onClick={() => handleCardClick(card.id)}
              >
                <div className="flex items-center group-aria-disabled:opacity-[.45]">
                  <img
                    className="me-1 h-3 w-3 object-contain md:h-4 md:w-4"
                    src="https://cdn-gop.garenanow.com/gop/app/0000/100/067/point.png"
                    alt="Diamond"
                  />
                  <span className="text-sm/none font-medium md:text-lg/none">
                    {card.value}
                  </span>
                </div>
              </div>
              <div
                className="absolute inset-0 hidden cursor-pointer peer-aria-checked:block"
                id={`headlessui-radiogroup-option-${card.id}`}
                role="radio"
                aria-checked={selectedCard === card.id}
              />
            </div>
          ))}
        </div>
      </div>
    </div>

    <div className="flex flex-col empty:hidden" role="none">
      <div className="flex flex-col gap-4 empty:hidden" role="none">
        <div role="none">
          <div className="mb-2 flex items-center" role="none">
            <div className="text-base/none font-bold text-text-secondary" role="none">
            
              {language ==='en' ? 'Special Offers' : 'العروض الخاصة'}
            </div>
            <hr className="ms-2 grow border-line" role="none" />
          </div>
          <div className="grid grid-cols-2 gap-2.5 md:grid-cols-4 md:gap-4" role="none">
            {cardss.map((card) => (
              <div
              onClick={() => handleClick('chan')}
               key={card.id} className="relative" role="none">
                <div
                  className={`group peer relative flex h-full cursor-pointer flex-col items-center rounded-md p-1.5 pb-2 outline outline-1 outline-gray-200 outline-box-border ${
                    activeCard === card.id
                      ? 'bg-[rgb(255,244,244,calc(1*1))] outline-red-700 outline-2 -outline-offset-2 '
                    : 'bg-bg-unselected outline-box-border'
                  }`}
                  id={`headlessui-radiogroup-option-${card.id}`}
                  role="radio"
                  aria-checked={activeCard === card.id}
                  tabIndex={-1}
                  data-headlessui-state=""
                  onClick={() => handleCardClickk(card.id)}
                >
                  <div className="relative mb-2 w-full overflow-hidden rounded-sm pt-[56.25%]">
                    <img
                      className="pointer-events-none absolute inset-0 h-full w-full object-cover group-aria-disabled:opacity-[.45]"
                      src={card.imgSrc}
                      alt={card.altText}
                    />
                  </div>
                  <div className="line-clamp-2 text-center text-sm/[18px] font-medium group-aria-disabled:opacity-[.45]">
                    {card.title}
                  </div>
                </div>
                <div
                  className={`absolute inset-0 ${
                    activeCard === card.id ? 'block' : 'hidden'
                  } cursor-pointer peer-aria-checked:block`}
                  id={`headlessui-radiogroup-option-${card.id}`}
                  role="radio"
                  aria-checked={activeCard === card.id}
                  data-headlessui-state=""
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
                
              </div>
            </div>
            <span
              id="headlessui-tabs-panel-:r1j:"
              role="tabpanel"
              tabIndex={-1}
              aria-labelledby="headlessui-tabs-tab-:r10:"
              style={{
                position: "fixed",
                top: 1,
                left: 1,
                width: 1,
                height: 0,
                padding: 0,
                margin: "-1px",
                overflow: "hidden",
                clip: "rect(0px, 0px, 0px, 0px)",
                whiteSpace: "nowrap",
                borderWidth: 0
              }}
            />
          </div>
        </div>



        <div
          className="flex flex-col"
          id="headlessui-radiogroup-:rf:"
          role="radiogroup"
        >
          <div
            id="channel-section"
            className="mb-3 flex scroll-mt-36 items-center gap-2 text-lg/none font-bold text-text-title md:text-xl/none"
            role="none"
          >
            <div className="grid items-center" data-marker="true" role="none">
              <svg
                width="1em"
                height="1em"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="col-start-1 row-start-1 text-2xl text-primary-red"
                role="none"
              >
                <path
                  d="M0 3C0 1.34315 1.34315 0 3 0H21C22.6569 0 24 1.34315 24 3V15.7574C24 16.553 23.6839 17.3161 23.1213 17.8787L17.8787 23.1213C17.3161 23.6839 16.553 24 15.7574 24H3C1.34315 24 0 22.6569 0 21V3Z"
                  fill="currentColor"
                  role="none"
                />
              </svg>
              <div
                className="col-start-1 row-start-1 text-center text-base/none text-white"
                role="none"
              >
                3
              </div>
            </div>

            
            <div role="none">
          
            {language ==='en' ? 'Payment Methods' : 'طرق الدفع'}
            </div>
          </div>



          <div className="relative oddd">
      <div className="relative scroll-mt-40">
        <div
          className={`mb-2 outline outline-1 outline-gray-200 group peer relative flex h-full min-h-[80px] cursor-pointer items-start gap-2 rounded-md 
            ${selected === 'channel-230199'? 'bg-[rgb(255,244,244,calc(1*1))] outline-red-700 outline-2 -outline-offset-2 '
                    : 'bg-bg-unselected outline-box-border'} 
            max-md:flex-col max-md:justify-center md:items-center md:gap-3 md:p-3`}
          id="channel-230199 headlessui-radiogroup-option-:r32:"
          role="radio"
          aria-checked={selected === 'channel-230199'}
          tabIndex={0}
          onClick={() => handleClick('channel-230199')}
        >
          <img
            className="pointer-events-none h-10 w-full object-contain object-left group-aria-disabled:[mix-blend-mode:luminosity] rtl:object-right dark:group-aria-disabled:opacity-40 max-md:shrink max-md:grow md:h-14 md:w-14"
            src="https://cdn-gop.garenanow.com/webmain/static/payment_center/mena/me_visamastercard_mb.png"
            alt="Visa/MasterCard"
          />
          <div className="ooddd flex w-full flex-wrap gap-x-0.5 gap-y-1 text-sm/none font-medium md:flex-col md:gap-y-2 md:text-base/none">
            <span className="relative">
              <span className="items-center [text-decoration:inherit] inline-flex">
                US$ 20
              </span>
            </span>
            <span className="inline-flex items-center gap-0.5 text-sm/none text-bonus">
              <span>
                
                {language ==='en' ? '+ Bonus 220' : '+ مكافأة 220'}
                </span>
              <img
                className="h-3 w-3 object-contain"
                src="https://cdn-gop.garenanow.com/gop/app/0000/100/067/point.png"
                alt="Bonus"
              />
            </span>
          </div>
          <div
            className="absolute end-[3px] top-[3px] overflow-hidden rounded-[3px]"
          >
            <div className="flex text-2xs/none font-bold uppercase">
              <div
                style={{backgroundColor: "rgb(230 37 45 / calc(1 * 1))"}}
                className="h-4 flex items-center gap-1 bg-bg-tag-promo p-0.5 pe-1 text-white"
              >
                <img
                  className="h-3 w-3 rounded-sm bg-white object-contain p-0.5"
                  src="https://cdn-gop.garenanow.com/gop/app/0000/100/067/point.png"
                  alt="Special Offer"
                />
              
                {language ==='en' ? 'Special Offer' : 'عرض خاص'}
              </div>
            </div>
          </div>
        </div>
        <div
          className="absolute inset-0 hidden cursor-pointer peer-aria-checked:block"
          id="headlessui-radiogroup-option-:r33:"
          role="radio"
          aria-checked={selected === 'channel-230199'}
        />
      </div>
      
    </div>

          
        </div>
        
        
      </div>
      )}
          
          {showButton && (
  <div dir= {language ==='en'? "ltr":"rtl"} className="fdds sticky inset-x-0 bottom-0 z-10" data-headlessui-state="">
  <div className="mx-auto flex w-full max-w-5xl items-center justify-between gap-4 border-t border-line/50 bg-bg-base p-4 md:justify-end md:gap-10 md:border-none lg:px-10">
    <div className="flex flex-col md:items-end">
      <div className="flex items-center gap-1 text-sm/none font-bold md:text-end md:text-base/none">
        <span>Monthly Membership</span>
      </div>
      <div className="mt-2 flex items-center gap-1 text-sm/none md:text-end md:text-base/none">
        <span className="font-medium">
      
        {language ==='en' ? 'Sum:' : 'المجموع:'}
        </span>
        <span className="items-center [text-decoration:inherit] flex font-bold text-text-content2">
          US$ 20
        </span>
      </div>
    </div>


    
  <button
  onClick={handleButtonClick}
    style={{
       color:"#fff",
       background:"#D81A0D",
       fontWeight: "700",
       zIndex:"0",
    }}
   className="inline-flex items-center justify-center gap-1.5 rounded-md border py-1 text-center leading-none transition-colors border-primary-red bg-primary-red text-white hover:bg-primary-red-hover hover:border-primary-red-hover px-5 text-base font-bold h-11">

  <span className="text-lg h-[18px] w-[18px]">
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M54.125 34.1211C55.2966 32.9495 55.2966 31.05 54.125 29.8784C52.9534 28.7069 51.0539 28.7069 49.8823 29.8784L38.0037 41.7571L32.125 35.8784C30.9534 34.7069 29.0539 34.7069 27.8823 35.8784C26.7108 37.05 26.7108 38.9495 27.8823 40.1211L35.8823 48.1211C37.0539 49.2926 38.9534 49.2926 40.125 48.1211L54.125 34.1211Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M43.4187 3.4715C41.2965 2.28554 38.711 2.28554 36.5889 3.4715L8.07673 19.4055C6.19794 20.4555 4.97252 22.4636 5.02506 24.7075C5.36979 39.43 10.1986 63.724 37.0183 76.9041C38.8951 77.8264 41.1125 77.8264 42.9893 76.9041C69.809 63.724 74.6377 39.43 74.9825 24.7075C75.035 22.4636 73.8096 20.4555 71.9308 19.4055L43.4187 3.4715ZM39.5159 8.7091C39.8191 8.53968 40.1885 8.53968 40.4916 8.7091L68.9826 24.6313C68.6493 38.3453 64.2154 59.7875 40.343 71.5192C40.135 71.6214 39.8725 71.6214 39.6646 71.5192C15.7921 59.7875 11.3583 38.3453 11.025 24.6313L39.5159 8.7091Z"
        fill="currentColor"
      />
    </svg>
  </span>
  
  {language ==='en' ? 'Buy Now' : 'شراء الآن'}
</button>
 


  </div>
</div>

)}

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


