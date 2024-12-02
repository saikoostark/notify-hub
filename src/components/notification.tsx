import './notification.css'


export default function Notification({ title, body }: { title: string, body: string }) {


    console.log('i am notification testing only');



    const popupFadeStyle = {
        animation: 'popupFade 10s forwards',
    };

    const keyframes = {
        '@keyframes popupFade': {
            '0%': {
                opacity: 0,
                transform: 'translateY(20px)',
            },
            '5%': {
                opacity: 1,
                transform: 'translateY(0)',
            },
            '95%': {
                opacity: 1,
                transform: 'translateY(0)',
            },
            '100%': {
                opacity: 0,
                transform: 'translateY(20px)',
            },
        },
    };



    return (
        <div
            style={{ ...popupFadeStyle, ...keyframes }}
            className="popup absolute bg-white rounded-lg p-2 text-black flex flex-col
        left-1/2 -translate-x-1/2 top-10 -translate-y-1/2 items-center
        ">
            <h1>{title}</h1>
            <h2>{body}</h2>
        </div>
    )

}
