# Clash Mixin Script

This is a [Clash](https://github.com/Dreamacro/clash) Mixin script that creates new proxy-groups and appends them to the original `proxy-groups` configuration.

## What It Does

该脚本会自动将 Clash 配置文件中的代理按照指定的关键词分组，例如在本脚本中是按照 "香港"、"日本"、"台湾"、"新加坡"、"美国"、"HK"、"SG"、"JP"、"US" 进行分组。然后，脚本会为每个分组创建一个名为 "LoadBalancing_关键词" 的代理组，并将相应的代理添加到该代理组中。最后，该脚本会将所有新的代理组添加到原有配置文件的 "proxy-groups" 属性中，以便进行负载均衡。

This script scans through all proxies in the `proxies` section of your Clash configuration file and groups them according to your specified country keywords. Then it creates a new proxy-group for each group, named as `LoadBalancing_{country}`, and adds them to the original `proxy-groups` section. 

Finally, it appends the new proxy-group names to the `proxies` list in each original proxy-group, effectively load balancing the proxies by country.

## Official Documentation

For more information on how to use Mixin scripts with Clash, please refer to the official documentation:

https://docs.cfw.lbyczf.com/contents/mixin.html#%E7%89%88%E6%9C%AC%E8%A6%81%E6%B1%82

## License

This project is licensed under the terms of the MIT license.
