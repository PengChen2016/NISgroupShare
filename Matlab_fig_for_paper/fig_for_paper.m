% figure for paper
%% Introduction
%%%%%%%%%%%% 原则
% 图形美化-位置、大小合适等要根据论文来，而且别浪费时间

%%%%%%%%%%%% Latex指令
%\it斜体 \rm 正体 ^上标 _下标 {}组合
% \bf加粗


%% 示例
% 设置FED所需样式为画图默认值
ft=figtool;
ft.init_fed();

% 左右ab图
figure
% ne
subplot(1,2,1);
% set(gca, 'Position',[0.1 0.19 0.355 0.73]) % 根据画面手动调整
legend_text={};
semilogx(p,plasma.ne(:,1),'-o') % 使用设置好的默认颜色顺序
legend_text{end+1}='{\itf}=1MHz'; % tex语法文本
hold on
semilogx(p,plasma.ne(:,2),'-.o')
legend_text{end+1}='{\itf}=4MHz'; % 图例文字与画图指令放在一起
ylabel('{\itn}_e [m^{-3}]')
xlabel('{\itp}_{fill} [Pa]')
xticks([0.3,1,3,10]) % 控制X轴显示
grid on
L1=legend(legend_text); 
set(L1,'location','southeast');
set(L1,'box','off')
set(L1,'AutoUpdate','off')
max_y=2e17;
axis([0.3,10,min_y,max_y]) 
text(0.7,0.95*(max_y-min_y)+min_y,'(a)') % 子图标记
% Te
subplot(1,2,2);
set(gca, 'Position',[0.61 0.19 0.355 0.73])
% ...
text(0.7,0.95*max_y,'(b)')

ft.print_fed('vec_emf','neTe') %生成图片文件

%% 零散
axis tight 
set(gcf, 'Position',[18,14,9,9])
set(gca, 'Position',[0.21 0.19 0.78 0.72]) 

ft.print_fed('copy','') % emf矢量图到剪贴板

line([0,45.5],[a,b],'color', [0.8500    0.3250    0.0980]); % 指定颜色
rectangle('Position',[0,0,50,1],'LineStyle', 'none', 'FaceColor',[196 203 207]/255)
% 注意画图顺序

% 额外图例：第二个坐标轴中处理
legend_text2={};
legend_2=[];
legend_2(end+1)=loglog(Te_array,k_array,'-b','LineWidth',5); % 句柄
legend_text2{end+1}='n=2 2020LZS'; % 图例文本
axes2 = axes('position',get(gca,'position'),'visible','off');
L2=legend(axes2, legend_2, legend_text2{:});

% 调整下次要使用的颜色序号（默认颜色中第几个）
set(gca,'ColorOrderIndex',1);

ft.post_2yaxis() % 双Y轴图中，将双Y轴颜色改为黑色

% 获得特定颜色的RGB
co=my.get_color_order('');
temp_color=co(1,:);