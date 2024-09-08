#!/bin/bash
# 将执行结果追加到日志文件
cd /home/janesummer/sync_text_back_end
echo "准备执行自动更新文档" >> git.log
git add .
git commit -m "自动更新文档"
git push >> git.log
# 为方便查看，追加一行日期
date >> git.log
# 同样，追加分割线
echo "==========" >> git.log
