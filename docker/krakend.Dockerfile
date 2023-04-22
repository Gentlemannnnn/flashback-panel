FROM devopsfaith/krakend:2.1.3
ENV FC_ENABLE=1
ENV FC_SETTINGS="/etc/krakend/settings"
ENV FC_PARTIALS="/etc/krakend/partials"
ENV FC_TEMPLATES="/etc/krakend/templates"
RUN mkdir $FC_SETTINGS
RUN mkdir $FC_PARTIALS
RUN mkdir $FC_TEMPLATES
COPY ./gateway /etc/krakend/
