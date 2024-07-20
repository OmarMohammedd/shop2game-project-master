'use client'
import React from 'react';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
const Adminview = () => {

    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [authenticated, setAuthenticated] = useState(false)

    function handleformSubmit(e) {
        e.preventDefault()


        if (name === process.env.NEXT_PUBLIC_ADMIN_NAME && password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD) {
            setAuthenticated(true)
            alert('Logged in !')
        } else {
            alert('Invalid Username or Password')
        }
    }





    return (
        <>
            {
                !authenticated ? (
                    <div className='  mt-20 px-3 w-[400px] max-[445px]:w-full  m-auto h-[300px] rounded-lg shadow-lg border border-[#e5e5e5]'>
                        <h1 className=' text-center mx-2 text-xl font-bold mt-10 font-ar '>تسجيل الدخول</h1>
                        <form onSubmit={handleformSubmit}>
                            <Input value={name} onChange={(e) => setName(e.target.value)} className=' font-ar  mt-5' placeholder='اسم المستخدم' />
                            <Input value={password} onChange={(e) => setPassword(e.target.value)} className=' font-ar  mt-5' placeholder='كلمة المرور' />
                            <Button type="submit" variant='custom' className='w-full  rounded-tr-sm rounded-br-sm mt-8'>
                                يُقدِّم
                            </Button>
                        </form>
                    </div>
                ) : (
                    <div className=' w-full flex  items-center justify-center h-full'>
                        <div className=' w-full px-5 flex items-start flex-wrap justify-center gap-40 max-[1036px]:justify-between
                        max-[1036px]:gap-0 max-[888px]:items-center max-[888px]:justify-center mb-20
                        '>
                            <AddPlayer />
                            <AddRedeemCode />
                        </div>

                    </div>
                )
            }
        </>
    );
}

export default Adminview;



const AddPlayer = () => {
    const [playerName, setPlayerName] = useState('');
    const [playerUid, setPlayerUid] = useState('');
    const [playerGameType, setPlayerGameType] = useState('freefire');
    const [loading, setLoading] = useState(false);

    const handleGameTypeChange = (e) => {
        setPlayerGameType(e.target.value);
    };

    async function handlePlayerAdd(e) {
        e.preventDefault();


        if (playerName === '' || !playerUid || !playerGameType) {
            return alert('All fields are required');
        }
        if (playerUid.length !== 8) {
            return alert('Player UID must be 8 digits');
        }
        setLoading(true);
        // const uid = Number(playerUid);
        try {
            setPlayerName('')
            setPlayerUid('')
            setPlayerGameType('freefire')

            const response = await fetch("/api/add-user", {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify({ name: playerName, uid: playerUid, game: playerGameType })
            });


            const responseData = await response.json();
            if (!responseData.success) {
                alert(responseData.message);
            } else {
                alert(responseData.message);
            }
        } catch (error) {
            alert(error.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className='mt-20 m-3 px-3 w-[400px] h-fit py-3 rounded-lg shadow-lg border border-[#e5e5e5]'>
            <h1 className='text-center text-xl font-ar  font-bold mt-10'>إضافة لاعب</h1>
            <form onSubmit={handlePlayerAdd}>
                <Input
                    value={playerName}
                    onChange={(e) => setPlayerName(e.target.value)}
                    className=' font-ar mt-5'
                    placeholder='اسم اللاعب'
                />
                <Input
                    value={playerUid}
                    onChange={(e) => setPlayerUid(e.target.value)}
                    className=' font-ar mt-5'
                    placeholder='معرف اللاعب'
                />
                <select
                    className='w-full px-2 py-2 mt-5 rounded-md shadow-sm border'
                    onChange={handleGameTypeChange}
                    value={playerGameType}
                >
                    <option value="freefire">Freefire</option>
                    <option value="blackclover">BlackClover</option>
                </select>
                <Button
                    disabled={loading}
                    type="submit"
                    variant='custom'
                    className='w-full rounded-tr-sm rounded-br-sm mt-8'
                >
                    {!loading ? 'يُقدِّم' : '...يُقدِّم'}
                </Button>
            </form>
        </div>
    );
}



const AddRedeemCode = () => {
    const [redeemcode, setredeemcode] = useState('');
    const [prize, setPrize] = useState('');
    const [game, setGame] = useState('freefire');
    const [cost, setCost] = useState(game === 'freefire' ? 1 : 50);
    const [loading, setLoading] = useState(false);

    const handleGameTypeChange = (e) => {
        setGame(e.target.value);
        // setCost(''); // Reset cost when game type changes
    };

    const handleCostChange = (e) => {
        setCost(e.target.value);
    };

    function isNumber(value) {
        return !isNaN(value);
    }

    const handlePlayerAdd = async (e) => {
        e.preventDefault();
        console.log(redeemcode, cost, prize, game);

        const valid = isNumber(prize);
        if (!valid) {
            return alert('Please enter a valid prize');
        }

        if (redeemcode === '' || !prize || !game) {
            return alert('All fields are required');
        }

        if (redeemcode.length !== 10 || isNaN(redeemcode)) {
            return alert('Redeem Code must be of 10 digits');
        }


        const numPrize = Number(prize);
        const numCost = Number(cost);

        setLoading(true);
        try {
            const response = await fetch('/api/add-code', {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify({ code: redeemcode, prize: numPrize, cost: numCost, game })
            });

            const responseData = await response.json();
            alert(responseData.message);

            if (responseData.success) {
                setredeemcode('');
                setPrize('');
                setCost('');
                setGame('freefire');
            }
        } catch (error) {
            alert(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='mt-20 m-3 px-3 w-[400px] h-fit py-3 rounded-lg shadow-lg border border-[#e5e5e5]'>
            <h1 className='text-center text-xl font-bold mt-10 font-ar '>إنشاء رمز</h1>
            <form onSubmit={handlePlayerAdd}>
                <Input
                    value={redeemcode}
                    onChange={(e) => setredeemcode(e.target.value)}
                    className=' font-ar mt-5'
                    placeholder='ادخل الرمز'
                />
                <select
                    className='w-full px-2 py-2 mt-5 rounded-md shadow-sm border'
                    value={game}
                    onChange={handleGameTypeChange}
                >
                    <option value='freefire'>Freefire</option>
                    <option value='blackclover'>BlackClover</option>
                </select>

                {game === 'freefire' && (
                    <select
                        className='w-full px-2 py-2 mt-5 rounded-md shadow-sm border'
                        value={cost}
                        onChange={handleCostChange}
                    >
                        <option value='1'>$1</option>
                        <option value='2'>$2</option>
                        <option value='5'>$5</option>
                        <option value='10'>$10</option>
                        <option value='20'>$20</option>
                    </select>
                )}

                {game === 'blackclover' && (
                    <select
                        className='w-full px-2 py-2 mt-5 rounded-md shadow-sm border'
                        value={cost}
                        onChange={handleCostChange}
                    >
                        <option value='50'>50</option>
                        <option value='100'>100</option>
                        <option value='250'>250</option>
                        <option value='500'>500</option>
                        <option value='1000'>1000</option>
                    </select>
                )}

                <Input
                    value={prize}
                    onChange={(e) => setPrize(e.target.value)}
                    className=' font-ar mt-5'
                    placeholder='أدخل مبلغ الجائزة'
                />

                <Button
                    disabled={loading}
                    type='submit'
                    variant='custom'
                    className='w-full rounded-tr-sm rounded-br-sm mt-8'
                >
                    {!loading ? 'يُقدِّم' : '...يُقدِّم'}
                </Button>
            </form>
        </div>
    );
};

