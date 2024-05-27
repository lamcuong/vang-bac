import { useEffect, useRef, useState } from "react";
import Clock from "./components/Clock";
import RainbowText from "./components/RainbowText";
import { Helmet } from "react-helmet";
import * as signalR from "@microsoft/signalr";

function App() {
  const [message, setMessage] = useState(null);
 
  useEffect(() => {
    const connection = new signalR.HubConnectionBuilder().withUrl("https://192.168.1.136:80/offers").build();

    connection
      .start()
      .then(() => {
        console.log("SignalR Connected");

        // Subscribe to the "ReceiveMessage" event
        connection.on("SendOffers", (user, message) => {
          console.log("Received message:", message);
        });

        // Start the interval message from the server
        connection.invoke("SendOffersToUser").catch((err) => console.error(err));
      })
      .catch((err) => console.error(err));

    // Clean up the connection on component unmount
    return () => {
      connection
        .stop()
        .then(() => console.log("SignalR Disconnected"))
        .catch((err) => console.error(err));
    };
  }, []);

  console.log(message);
  const baseUrl = "http://pc.thietbinganhvang.com";

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column", alignItems: "stretch", opacity: 1 }}>
      <Helmet>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <link rel="author" href="" />
        <base href="http://pc.thietbinganhvang.com/" />
        <title>Bảng giá vàng - Khac - Vàng bạc Chung Đức</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <meta name="Keywords" content="" />
        <meta name="Description" content="" />
        {/* <link href="publics/css/style.css" rel="stylesheet" type="text/css" media="all" /> */}
        <script src="publics/scripts/jquery.js"></script>
        <link href=" index.css" rel="stylesheet" />
        {/* <script type="text/javascript" src="publics/scripts/js.menu.js"></script> */}
        <meta property="og:url" content="http://pc.thietbinganhvang.com/view" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Bảng giá vàng - Khac - Vàng bạc Chung Đức" />
        <meta property="og:description" content="" />
        <meta property="og:image" content="https://www.kitco.com/images/live/gold.gif" />
        <meta property="og:image:width" content="640" />
        <meta property="og:image:height" content="480" />
      </Helmet>
      <div id="header">
        <table border="0" cellpadding="1" cellspacing="1" style={{ width: "100%" }}>
          <tbody>
            <tr>
              <td>
                <input
                  alt=""
                  src={`${baseUrl}/uploads/files/pb.gif`}
                  style={{ width: "160px", height: "140px" }}
                  type="image"
                />
              </td>
              <td style={{ textAlign: "center" }}>
                <img alt="" src={`${baseUrl}/uploads/images/CD1.gif`} style={{ width: "100%", height: "140px" }} />
              </td>
              <td>
                <input
                  alt=""
                  src={`${baseUrl}/uploads/files/PHONECD.png`}
                  style={{ width: "160px", height: "144px", float: "right" }}
                  type="image"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div id="content">
        <div id="header2">
          <div>
            <table bgcolor="#a51101" border={0} cellPadding={0} cellSpacing={0} style={{ width: "100%" }}>
              <tbody>
                <tr>
                  <td style={{ textAlign: "center" }}>
                    <div>
                      <font color="#ffff00">
                        <span style={{ fontSize: 45 }}>
                          <b>GIÁ VÀNG HÔM NAY</b>
                        </span>
                      </font>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <p className="text-clock">--- Đơn vị tính: Đồng / 1 chỉ</p>
            <div id="showClock" style={{ paddingRight: "10px" }}>
              <Clock />
            </div>
          </div>
        </div>
        <div id="main-content">
          <div className="left" id="dataTable">
            <table border={0} cellPadding={0} cellSpacing={0} id="data-table">
              <tbody>
                <tr>
                  <td
                    style={{
                      background: "#0000ff",
                      color: "#ffffff",
                      fontSize: 45,
                      textAlign: "center",
                    }}
                    className="font-style-bold"
                  >
                    LOẠI VÀNG
                  </td>
                  <td
                    style={{
                      background: "#0000ff",
                      color: "#ffffff",
                      fontSize: 45,
                      textAlign: "center",
                    }}
                    className="font-style-bold"
                  >
                    MUA VÀO
                  </td>
                  <td
                    style={{
                      background: "#0000ff",
                      color: "#ffffff",
                      fontSize: 45,
                      textAlign: "center",
                    }}
                    className="font-style-bold"
                  >
                    BÁN RA
                  </td>
                </tr>
                <tr>
                  <td style={{ textAlign: "center" }} className="font-style-bold">
                    VÀNG 999
                  </td>
                  <td id="mua-vao-999" style={{ textAlign: "center" }} className="font-style-bold">
                    {message?.id}
                  </td>
                  <td style={{ textAlign: "center" }} className="font-style-bold">
                    5.380.000
                  </td>
                </tr>
                <tr>
                  <td style={{ textAlign: "center" }} className="font-style-bold">
                    VÀNG TÂY 10K
                  </td>
                  <td style={{ textAlign: "center" }} className="font-style-bold">
                    {message?.pass}
                  </td>
                  <td style={{ textAlign: "center" }} className="font-style-bold">
                    2.550.000
                  </td>
                </tr>
                <tr>
                  <td style={{ textAlign: "center" }} className="font-style-bold">
                    BẠC
                  </td>
                  <td style={{ textAlign: "center" }} className="font-style-bold">
                    {message?.name}
                  </td>
                  <td style={{ textAlign: "center" }} className="font-style-bold">
                    75.000
                  </td>
                </tr>
                <tr>
                  <td style={{ textAlign: "center" }} className="font-style-bold">
                    USD
                  </td>
                  <td style={{ textAlign: "center" }} className="font-style-bold">
                    2.340.000
                  </td>
                  <td style={{ textAlign: "center" }} className="font-style-bold">
                    2.355.000
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          {/* <div className="right" id="content_box_right" /> */}
        </div>
      </div>
      <div id="footer">
        <marquee scrollamount="10">
          <div style={{ fontSize: "20px" }}>
            <RainbowText
              text=" V&Agrave;NG BẠC CHUNG ĐỨC - H&Acirc;N HẠNH PHỤC VỤ QU&Yacute; KH&Aacute;CH - QU&Yacute; KH&Aacute;CH VUI
            L&Ograve;NG KIỂM TRA LẠI V&Agrave;NG V&Agrave; TIỀN TRƯỚC KHI RA VỀ"
              speed={10}
              brightness={80}
              initialHue={180}
            />
          </div>
        </marquee>
      </div>
    </div>
  );
}

export default App;
