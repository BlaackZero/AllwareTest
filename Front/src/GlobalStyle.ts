import { createGlobalStyle } from "styled-components";


export const color = {
    primary: '#002EFF',
}

export const GlobalStyle = createGlobalStyle`
    html{
        box-sizing: border-box;
    }
    *,*::before,*::after{
        box-sizing: border-box;
    }
    body{
        font-family: 'Barlow', sans-serif;
        margin: 0;
        h1,h2,h3,h4,h5,h6,p{
            margin: 0;
        }
        strong{
            font-weight: 700;
        }

    }

    button {
        font-family: 'Barlow', sans-serif;
        font-weight: 600;
        cursor: pointer;
        padding: 12px 16px;
        background-color: ${color.primary};
        color: white;
        border-radius: 24px;
        outline: none;
        border: none;
    }

    label {
        position: relative;

        p {
            padding: 2px 4px;
            font-size: 12px;
            position: absolute;
            bottom: 80%;
            background-color: white;
            left: 5%;
            color: ${color.primary};

            span {
                color: red;
            }
        }
        
        select {
            min-width: 220px;
            padding: 8px;
            border-radius: 8px;
            outline: none;
            border: 1px solid ${color.primary};

            option {
                font-family: 'Barlow', sans-serif;
            }
        }

        input {
            min-height: 35px;
            padding: 8px;
            border-radius: 8px;
            outline: none;
            border: 1px solid ${color.primary};
            font-family: 'Barlow', sans-serif;
        }
    }

    h5 {
        color: red;
    }

    table {
        border-radius: 8px;
        width: 100%;
        border-collapse: collapse;

        th, td {
            padding: 8px;
            text-align: left;
            border-bottom: 1px solid #d7d7d7;
        }

        tr {

            &:nth-child(even) {
                background-color: #fbfbfb;
            }

            &:hover {
                background-color: #e5e4e4;
            }
        }
    }


    .separador {
        margin: 6px 0;
        border-top: 1px solid #e7e3e3;
    }
`