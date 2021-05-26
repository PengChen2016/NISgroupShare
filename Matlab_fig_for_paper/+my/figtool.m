% 绘图辅助函数
% 参考
% 论文制图
% https://zhuanlan.zhihu.com/p/114980765
% https://zhuanlan.zhihu.com/p/65116358
% MATLAB文档
% https://ww2.mathworks.cn/help/matlab/creating_plots/default-property-values.html
% https://ww2.mathworks.cn/help/releases/R2017a/matlab/ref/figure-properties.html
% https://ww2.mathworks.cn/help/releases/R2017a/matlab/ref/axes-properties.html
% https://ww2.mathworks.cn/help/releases/R2017a/matlab/ref/primitiveline-properties.html
classdef figtool
    properties
        character_set_name
        figure_width
        figure_height
        font_name
        font_size
        line_line_width
        line_marker_size
        axes_line_width
        line_color_order
        line_style_order
    end
    
    methods
        % 不建议使用非 无输入构造函数
        %         function obj=style_class(in_type)
        %         end
        
        function init_fed(obj)
            % for journal FED
            % FED对论文插图的样式要求
            % https://www.elsevier.com/journals/fusion-engineering-and-design/0920-3796/guide-for-authors
            
            obj.character_set_name='UTF-8';
            %% 图幅
            % TARGET SIZE	Image width
            % Minimal size	3cm
            % Single column	9cm
            % 1.5 column	14cm
            % Double column (max)	19cm
            % Pixels = Resolution (DPI) × Print size (in inches);
            obj.figure_width=9;
            obj.figure_height=9*0.618;
            
            %% 字体
            % 字体：Arial (or Helvetica), Times New Roman (or Times),
            % 图中字符印刷尺寸：普通文本7 pt，上下标字符>=6pt。
            % 但这个值会很小
            obj.font_name='Times New Roman';
            obj.font_size=9;
            
            %% 坐标轴
            obj.axes_line_width=0.5;
            
            %% 线型
            obj.line_line_width=2;
            obj.line_marker_size=4;
            obj.line_color_order=my.get_color_order('');
            obj.line_style_order={'-','-.','--'};
            
            %% set
            obj.set_default()
            % get(groot,'default')
        end
        
        function set_default(obj)
            feature('defaultCharacterSet',obj.character_set_name);
            %% 图幅
            set(groot,'defaultFigureUnits','centimeters')
            set(groot,'defaultFigurePosition',[20,20,...
                obj.figure_width,obj.figure_height])
            set(groot,'defaultAxesUnits','normalized')
            set(groot,'defaultAxesPosition',[0.12 0.17 0.84 0.75])
            
            %% 字体
            % get(groot,'defaultAxesFontName')
            % listfonts % 系统支持的字体
            % Font Name
            set(groot,'defaultTextFontname',obj.font_name)
            set(groot,'defaultAxesFontname',obj.font_name)
            % Font Size
            set(groot,'defaultAxesFontsize',obj.font_size);
            set(groot,'defaultTextFontsize',obj.font_size);
            % other
            % set(0,'defaultAxesFontWeight','bold');
            % set(0,'defaultTextFontWeight','bold');
            
            %% 坐标轴
            set(groot,'defaultAxesLineWidth',obj.axes_line_width)
            
            %% 线型
            set(groot,'defaultLineLineWidth',obj.line_line_width)
            set(groot,'defaultLineMarkerSize',obj.line_marker_size)
            set(groot,'defaultAxesColorOrder',obj.line_color_order)
            % 多坐标轴，则坐标轴默认颜色也为该值。然后再手动调整
            set(groot,'defaultAxesLineStyleOrder',obj.line_style_order)
        end
        
    end
    
    methods(Static)
        function post_2yaxis()
            ax=gca;
            yyaxis left
            ax.YColor = [0.15 0.15 0.15];
            yyaxis right
            ax.YColor = [0.15 0.15 0.15];
        end
        
        function post(xlabel_text, ylabel_text, legend_text)
            axis tight
            grid on
            xlabel(xlabel_text)
            ylabel(ylabel_text)
            L1=legend(legend_text);
            set(L1,'location','best');
            set(L1,'box','off')
            set(L1,'AutoUpdate','off');
            hold off
        end
        
        
        function set_color_order(type)
            line_color_order=get_color_order(type);
            set(groot,'defaultAxesColorOrder',line_color_order)
            % 多坐标轴，则坐标轴默认颜色也为该值。然后再调整
        end
        
        function print_fed(type, file_name)
            % Format and size of image file
            % 格式和DPI要求
            % 矢量图: .eps/pdf. 注意嵌入字体或将文本存为图形元素
            % 线图: .tiff/jpg, >=1000 dpi
            % 混合: .tiff/jpg, >=500 dpi
            % 彩色/黑白照片: .tiff/jpg, >=300 dpi
            
            switch type
                case 'copy'
                    print('-clipboard','-dmeta') % 剪贴板中
                case 'vec_eps'
                    % 矢量图
                    %             format_name='-dpdf';
                    format_name='-depsc'; %封装的 PostScript (EPS) 3 级彩色
                    %             format_name='-deps'; %封装的 PostScript (EPS) 3 级黑白
                    renderer_name='-painters';
                    print(file_name, format_name, renderer_name, '-tiff')
                    % 矢量图形需使用painters渲染器
                    % eps文件建议使用tiff预览
                case 'vec_emf'
                    % 矢量图
                    format_name='-dmeta'; % .emf for winOS
                    renderer_name='-painters';
                    print(file_name, format_name, renderer_name)
                    % 矢量图形需使用painters渲染器
                case 'bit_tif'
                    % 点位图
                    %             format_name='-djpeg';
                    format_name='-dtiff';
                    resolution_value='-r1000';
                    print(file_name, format_name, resolution_value)
            end
        end
        
    end
end