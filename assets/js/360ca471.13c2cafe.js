"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[7399],{1951:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>r,contentTitle:()=>s,default:()=>u,frontMatter:()=>o,metadata:()=>l,toc:()=>c});var i=t(5893),a=t(1151);const o={id:"plugin_intro",description:"Plugin introduction",slug:"/plugin/plugin_intro"},s="Plugin Introduction",l={id:"customization/plugin/plugin_intro",title:"Plugin Introduction",description:"Plugin introduction",source:"@site/docs/customization/plugin/plugin_intro.md",sourceDirName:"customization/plugin",slug:"/plugin/plugin_intro",permalink:"/TaskWeaver/docs/plugin/plugin_intro",draft:!1,unlisted:!1,editUrl:"https://github.com/microsoft/TaskWeaver/tree/docs/website/docs/customization/plugin/plugin_intro.md",tags:[],version:"current",frontMatter:{id:"plugin_intro",description:"Plugin introduction",slug:"/plugin/plugin_intro"},sidebar:"documentSidebar",previous:{title:"QWen",permalink:"/TaskWeaver/docs/llms/qwen"},next:{title:"Auto Plugin Selection",permalink:"/TaskWeaver/docs/customization/plugin/plugin_selection"}},r={},c=[{value:"Plugin Structure",id:"plugin-structure",level:2},{value:"Plugin Implementation",id:"plugin-implementation",level:2},{value:"Important Notes",id:"important-notes",level:3},{value:"Plugin Schema",id:"plugin-schema",level:2}];function d(e){const n={blockquote:"blockquote",code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,a.a)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(n.h1,{id:"plugin-introduction",children:"Plugin Introduction"}),"\n",(0,i.jsx)(n.p,{children:"Plugins are the units that could be orchestrated by TaskWeaver. One could view the plugins as tools that the LLM can\nutilize to accomplish certain tasks."}),"\n",(0,i.jsx)(n.p,{children:"In TaskWeaver, each plugin is represented as a Python function that can be called within a code snippet. The\norchestration is essentially the process of generating Python code snippets consisting of a certain number of plugins.\nOne concrete example would be pulling data from database and apply anomaly detection. The generated code (simplified) looks like\nfollows:"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-python",children:'df, data_description = sql_pull_data(query="pull data from time_series table")  \nanomaly_df, anomaly_description = anomaly_detection(df, time_col_name="ts", value_col_name="val") \n'})}),"\n",(0,i.jsx)(n.h2,{id:"plugin-structure",children:"Plugin Structure"}),"\n",(0,i.jsx)(n.p,{children:"A plugin has two files:"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"Plugin Implementation"}),": a Python file that defines the plugin"]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"Plugin Schema"}),": a file in yaml that defines the schema of the plugin"]}),"\n"]}),"\n",(0,i.jsx)(n.h2,{id:"plugin-implementation",children:"Plugin Implementation"}),"\n",(0,i.jsx)(n.p,{children:"The plugin function needs to be implemented in Python.\nTo be coordinated with the orchestration by TaskWeaver, a plugin python file consists of two parts:"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"Plugin function implementation code"}),"\n",(0,i.jsx)(n.li,{children:"TaskWeaver plugin decorator"}),"\n"]}),"\n",(0,i.jsx)(n.p,{children:"Here we exhibit an example of the anomaly detection plugin as the following code:"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-python",children:'import pandas as pd\nfrom pandas.api.types import is_numeric_dtype\n\nfrom taskWeaver.plugin import Plugin, register_plugin\n\n\n@register_plugin\nclass AnomalyDetectionPlugin(Plugin):\n    def __call__(self, df: pd.DataFrame, time_col_name: str, value_col_name: str):\n\n        """\n        anomaly_detection function identifies anomalies from an input dataframe of time series.\n        It will add a new column "Is_Anomaly", where each entry will be marked with "True" if the value is an anomaly\n        or "False" otherwise.\n\n        :param df: the input data, must be a dataframe\n        :param time_col_name: name of the column that contains the datetime\n        :param value_col_name: name of the column that contains the numeric values.\n        :return df: a new df that adds an additional "Is_Anomaly" column based on the input df.\n        :return description: the description about the anomaly detection results.\n        """\n        try:\n            df[time_col_name] = pd.to_datetime(df[time_col_name])\n        except Exception:\n            print("Time column is not datetime")\n            return\n\n        if not is_numeric_dtype(df[value_col_name]):\n            try:\n                df[value_col_name] = df[value_col_name].astype(float)\n            except ValueError:\n                print("Value column is not numeric")\n                return\n\n        mean, std = df[value_col_name].mean(), df[value_col_name].std()\n        cutoff = std * 3\n        lower, upper = mean - cutoff, mean + cutoff\n        df["Is_Anomaly"] = df[value_col_name].apply(lambda x: x < lower or x > upper)\n        anomaly_count = df["Is_Anomaly"].sum()\n        description = "There are {} anomalies in the time series data".format(anomaly_count)\n        \n        self.ctx.add_artifact(\n             name="anomaly_detection_results",  # a brief description of the artifact\n             file_name="anomaly_detection_results.csv",  # artifact file name\n             type="df",  # artifact data type, support chart/df/file/txt/svg\n             val=df,  # variable to be dumped\n        )\n        \n        return df, description\n\n'})}),"\n",(0,i.jsx)(n.p,{children:"You need to go through the following steps to implement your own plugin."}),"\n",(0,i.jsxs)(n.ol,{children:["\n",(0,i.jsxs)(n.li,{children:["import the TaskWeaver plugin decorator ",(0,i.jsx)(n.code,{children:"from taskWeaver.plugin import Plugin, register_plugin"})]}),"\n",(0,i.jsxs)(n.li,{children:["create your plugin class inherited from ",(0,i.jsx)(n.code,{children:"Plugin"})," parent class (e.g., ",(0,i.jsx)(n.code,{children:"AnomalyDetectionPlugin(Plugin)"}),"), which is\ndecorated by ",(0,i.jsx)(n.code,{children:"@register_plugin"})]}),"\n",(0,i.jsxs)(n.li,{children:["implement your plugin function in ",(0,i.jsx)(n.code,{children:"__call__"})," method of the plugin class.  ",(0,i.jsxs)(n.strong,{children:["Most importantly, it is mandatory to\ninclude ",(0,i.jsx)(n.code,{children:"descriptions"})," of your execution results in the return values of your plugin function"]}),". These descriptions\ncan be utilized by the LLM to effectively summarize your execution results."]}),"\n"]}),"\n",(0,i.jsxs)(n.blockquote,{children:["\n",(0,i.jsx)(n.p,{children:"\ud83d\udca1A key difference in a plugin implementation and a normal python function is that it always return a description of\nthe result in natural language. As LLMs only understand natural language, it is important to let the model understand\nwhat the execution result is. In the example implementation above, the description says how many anomalies are detected.\nBehind the scene, only the description will be passed to the LLM model. In contrast, the execution result (e.g., df in\nthe above example) is not handled by the LLM."}),"\n"]}),"\n",(0,i.jsx)(n.h3,{id:"important-notes",children:"Important Notes"}),"\n",(0,i.jsxs)(n.ol,{children:["\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsx)(n.p,{children:"If the functionality of your plugin depends on additional libraries or packages, it is essential to ensure that they\nare installed before proceeding."}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsxs)(n.p,{children:["If you wish to persist intermediate results, such as data, figures, or prompts, in your plugin implementation,\nTaskWeaver provides an ",(0,i.jsx)(n.code,{children:"add_artifact"})," API that allows you to store these results in the workspace. In the example we\nprovide, if you have performed anomaly detection and obtained results in the form of a CSV file, you can utilize\nthe ",(0,i.jsx)(n.code,{children:"add_artifact"})," API to save this file as an artifact. The artifacts are stored in the ",(0,i.jsx)(n.code,{children:"project/workspace/session_id/cwd"})," folder in the project directory."]}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-python",children:'self.ctx.add_artifact(\n    name="anomaly_detection_results",  # a brief description of the artifact\n    file_name="anomaly_detection_results.csv",  # artifact file name\n    type="df",  # artifact data type, support chart/df/file/txt/svg\n    val=df,  # variable to be dumped\n)\n'})}),"\n",(0,i.jsx)(n.h2,{id:"plugin-schema",children:"Plugin Schema"}),"\n",(0,i.jsx)(n.p,{children:"The plugin schema is composed of several parts:"}),"\n",(0,i.jsxs)(n.ol,{children:["\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"name"}),": The main function name of the Python code."]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"enabled"}),": determine whether the plugin is enabled for selection during conversations. The default value is true."]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"descriptions"}),": A brief description that introduces the plugin function."]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"parameters"}),": This section lists all the input parameter information. It includes the parameter's name, type,\nwhether it is required or optional, and a description providing more details about the parameter."]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"returns"}),": This section lists all the return value information. It includes the return value's name, type, and\ndescription that provides information about the value that is returned by the function."]}),"\n"]}),"\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.strong,{children:"Note:"})," The addition of any extra fields would result in a validation failure within the plugin schema."]}),"\n",(0,i.jsx)(n.p,{children:"The plugin schema is required to be written in YAML format. Here is the plugin schema example of the above anomaly\ndetection plugin:"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-yaml",children:'name: anomaly_detection\nenabled: true\nrequired: false\ndescription: >-\n  anomaly_detection function identifies anomalies from an input DataFrame of\n  time series. It will add a new column "Is_Anomaly", where each entry will be marked with "True" if the value is an anomaly or "False" otherwise.\n\nparameters:\n  - name: df\n    type: DataFrame\n    required: true\n    description: >-\n      the input data from which we can identify the anomalies with the 3-sigma\n      algorithm.\n  - name: time_col_name\n    type: str\n    required: true\n    description: name of the column that contains the datetime\n  - name: value_col_name\n    type: str\n    required: true\n    description: name of the column that contains the numeric values.\n\nreturns:\n  - name: df\n    type: DataFrame\n    description: >-\n      This DataFrame extends the input DataFrame with a newly-added column\n      "Is_Anomaly" containing the anomaly detection result.\n  - name: description\n    type: str\n    description: This is a string describing the anomaly detection results.\n\n'})}),"\n",(0,i.jsx)(n.p,{children:"Besides, we also set two optional fields as below:"}),"\n",(0,i.jsxs)(n.ol,{children:["\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"code"}),": In cases where multiple plugins map to the same Python code (i.e., the plugin name is different from the\ncode name), it is essential to specify the code name (code file) in the plugin schema to ensure clarity and accuracy."]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"configurations"}),": When using common code that requires some configuration parameter modifications for different\nplugins, it is important to specify these configuration parameters in the plugin schema."]}),"\n"]})]})}function u(e={}){const{wrapper:n}={...(0,a.a)(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(d,{...e})}):d(e)}},1151:(e,n,t)=>{t.d(n,{Z:()=>l,a:()=>s});var i=t(7294);const a={},o=i.createContext(a);function s(e){const n=i.useContext(o);return i.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function l(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(a):e.components||a:s(e.components),i.createElement(o.Provider,{value:n},e.children)}}}]);