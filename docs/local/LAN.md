# 局域网访问

 ## 1.前提
- ZError已在局域网内的一台计算机上运行且软件已打开局域网访问选项。
- 要访问的设备与ZError运行的设备位于同一局域网内

## 2.找到ZError运行的计算机的IP地址

1. 打开命令提示符（Windows）或终端（macOS/Linux）。
2. 输入以下命令并按下回车键：
    - Windows：`ipconfig`
    - macOS/Linux：`ifconfig`
3. 找到IPv4地址
    - Windows：查找“IPv4地址”行，通常在“以太网适配器”或“无线局域网适配器”下。
    - macOS/Linux：查找“inet”行，通常在“en0”或“wlan0”下。

    <div class="pic">
    <img src="/images/lan.png" alt="编辑" />
    </div>

4. 记录IPv4地址
    - 记下找到的IPv4地址，例如“192.168.137.1”

## 3.访问ZError并使用配置
- 在要访问的设备上打开浏览器。
- 在地址栏中输入ZError运行的计算机的IP地址，后跟端口号（默认端口为3000）。
- 例如：`http://192.168.137.1:3000`
- 按下回车键，即可访问ZError。

在题库配置中将URL设置为`http://192.168.137.1:3000/query`


