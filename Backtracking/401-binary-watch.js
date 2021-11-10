```
Difficulty: Easy
A binary watch has 4 LEDs on the top which represent the hours (0-11), and the 6 LEDs on the bottom represent the minutes (0-59). Each LED represents a zero or one, with the least significant bit on the right.

Given an integer turnedOn which represents the number of LEDs that are currently on, return all possible times the watch could represent. You may return the answer in any order.

The hour must not contain a leading zero.

For example, "01:00" is not valid. It should be "1:00".
The minute must be consist of two digits and may contain a leading zero.

For example, "10:2" is not valid. It should be "10:02".

二进制手表顶部有 4 个 LED 代表 小时（0-11），底部的 6 个 LED 代表 分钟（0-59）。

每个 LED 代表一个 0 或 1，最低位在右侧。
```

![](https://tva1.sinaimg.cn/large/0081Kckwly1gm5szmnbinj31400u0tra.jpg)

```
例如，上面的二进制手表读取 “3:25”。

给定一个非负整数 n 代表当前 LED 亮着的数量，返回所有可能的时间。



示例：

输入: n = 1
返回: ["1:00", "2:00", "4:00", "8:00", "0:01", "0:02", "0:04", "0:08", "0:16", "0:32"]

提示：

输出的顺序没有要求。
小时不会以零开头，比如 “01:00” 是不允许的，应为 “1:00”。
分钟必须由两位数组成，可能会以零开头，比如 “10:2” 是无效的，应为 “10:02”。
超过表示范围（小时 0-11，分钟 0-59）的数据将会被舍弃，也就是说不会出现 "13:00", "0:61" 等时间。

前置知识
  笛卡尔积
  回溯

  * 思路
  一看题目就是一个笛卡尔积问题。
  
  即给你一个数字 num， 我可以将其分成两部分。其中一部分（不妨设为 a）给小时，另一部分给分（就是 num - a）。 最终的结果就是 a 能表示的所有小时的集合和 num - a 所能表示的分的集合的笛卡尔积。
  ---------
  # 枚举小时
  for a in possible_number(i):
      # 小时确定了，分就是 num - i
      for b in possible_number(num - i, True):
          ans.add(str(a) + ":" + str(b).rjust(2, '0'))
  ---------
  枚举所有可能的 (a, num - a) 组合即可。
  ---------
  for i in range(min(4, num + 1)):
      for a in possible_number(i):
          for b in possible_number(num - i, True):
              ans.add(str(a) + ":" + str(b).rjust(2, '0'))
  --------- 
  进一步思考，实际上，我们要找的就是 a 和 b 相加等于 num，并且 a 和 b 就是二进制表示中 1 的个数。
```
/*
* solution 1 from others
*/
var readBinaryWatch = function(turnedOn) {
  let res = [];
  for(let i = 0;i < 12;i++){
      for(let j = 0;j < 60;j++){
          if(i.toString(2).split('0').join('').length+j.toString(2).split('0').join('').length===turnedOn){
              res.push(i+':'+(j<10?'0':'')+j);
          }
      }
  }
  return res;
};

/*
* solution 2 from leetcode, 64ms
*/
var readBinaryWatch = function(turnedOn) {
  const H={
      '0':[0],
      '1':[1,2,4,8],
      '2':[3,5,9,6,10],
      '3':[7,11]
  }
  const M={}
  for(let i=0;i<60;i++){
      let count=0;
      let num = i;
      if(num>=32){
          num-=32;
          count++;
      }
      if(num>=16){
          num-=16;
          count++;
      }
      if(num>=8){
          num-=8;
          count++;
      }
      if(num>=4){
          num-=4;
          count++;
      }
      if(num>=2){
          num-=2;
          count++;
      }
      if(num>=1){
          num-=1;
          count++;
      }
      if(M[count]===undefined) M[count]=[];
      M[count].push(i);
  }
  
  const answer =[];
  
  for(let i=0;i<=turnedOn;i++){
      let j= turnedOn-i;
      if(H[i]){
      H[i].forEach(hour=>{
          if(M[j]){
              M[j].forEach(minutes => {
                  answer.push(hour+':'+ (minutes < 10 ? ('0' + minutes) : minutes));
              })
          }
      })
          }

  }
  return answer;
};

/*
* solution 3 from leetcode, 72ms
*/
var readBinaryWatch = function(turnedOn) {
  const countBits = (num) => num === 0 ? 0 : countBits(num >> 1) + (num & 1);
  const convertToText = (h, m) => h + ':' + String(m).padStart(2, '0');
  const results = [];
  
  const bitCounts = [];
  for (let m = 0; m < 60; m++)
      bitCounts[m] = countBits(m);
  
  for (let h = 0; h < 12; h++) {
      for (let m = 0; m < 60; m++) {
          if (bitCounts[h] + bitCounts[m] === turnedOn)
              results.push(convertToText(h, m));
      }
  }
  
  return results;
};
/*
* solution 4 from leetcode, 76ms
*/
const pop = n => n ? ( 1 & n ) + pop( n >> 1 ) : 0
const hours = Array.from( { length: 4 }, _ => [] )
const mins  = Array.from( { length: 6 }, _ => [] )

for ( let i = 0; i < 12; i++ ) hours[ pop( i ) ].push( i )
for ( let i = 0; i < 60; i++ ) mins[ pop( i ) ].push( String( i ).padStart( 2, 0 ) )

var readBinaryWatch = function(num) {
    const times = []

    for ( let i = 0; i <= num; i++ ) {
        let h = hours[ i ]
        let m = mins[ num - i ]

        if ( h && m ) {
            h.forEach( hh => {
                m.forEach( mm => {
                    times.push( hh + ':' + mm )
                })
            })
        }
    }
    
    return times
}
